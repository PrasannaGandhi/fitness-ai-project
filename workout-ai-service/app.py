from flask import Flask, jsonify, Response, request
import cv2
import mediapipe as mp
import numpy as np
from flask_cors import CORS # Required to allow connections from React frontend

app = Flask(__name__)
CORS(app) # Enable CORS for frontend communication

# Initialize MediaPipe components
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# --- Global State for Control ---
rep_counter = 0
stage = "down" # Start stage as 'down' (arm straight)
counter_active = False
# --------------------------------

# Helper function to calculate angle (A=Shoulder, B=Elbow, C=Wrist)
def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    
    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle
        
    return angle

# API endpoint to START the counter
@app.route('/start_counter', methods=['POST'])
def start_counter():
    global counter_active, rep_counter, stage
    counter_active = True
    rep_counter = 0
    stage = "down" # Reset to down stage upon start
    print("--- COUNTER STARTED ---")
    return jsonify({"status": "Counter started", "rep_count": rep_counter})

# API endpoint to STOP the counter
@app.route('/stop_counter', methods=['POST'])
def stop_counter():
    global counter_active
    counter_active = False
    print("--- COUNTER STOPPED ---")
    return jsonify({"status": "Counter stopped"})

def generate_frames():
    global rep_counter, stage, counter_active
    cap = cv2.VideoCapture(0)
    
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break
            
            # --- Image Preprocessing (OpenCV) ---
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
            feedback = "Get Ready: Press Start"
            
            try:
                landmarks = results.pose_landmarks.landmark
                
                # Get coordinates for left arm (for bicep curl)
                shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                
                angle = calculate_angle(shoulder, elbow, wrist)
                
                # --- Form Correction Logic ---
                if counter_active:
                    feedback = "Extend arm fully (Angle > 160)"
                    
                    # 1. Check for arm straight (DOWN stage - Repetition Reset)
                    if angle > 160:
                        stage = "down"
                        feedback = "Arm extended. Curl up!"
                        
                    # 2. Check for peak contraction (UP stage - Repetition Count)
                    if angle < 30 and stage == "down":
                        stage = "up"
                        rep_counter += 1
                        feedback = "Great Rep! Now extend arm."
                    
                    # 3. Form Error Check (Prevent partial reps)
                    if angle < 160 and stage == "up":
                         feedback = "Slow down. Extend arm before next rep."


                # Display angle near the elbow
                cv2.putText(image, str(int(angle)), tuple(np.multiply(elbow, [image.shape[1], image.shape[0]]).astype(int)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)
                            
            except:
                # Runs if landmarks are not fully detected
                if counter_active:
                    feedback = "ADJUST CAMERA: Cannot see body."
                pass

            # Draw landmarks
            mp_drawing.draw_landmarks(
                image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
            )

            # Display counter and feedback text
            cv2.putText(image, feedback, (10, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
            cv2.putText(image, f"Reps: {rep_counter}", (10, 70),
            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 255), 2, cv2.LINE_AA)


            # Convert the image back to BGR and encode it as a JPEG for streaming
            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    # Add host='0.0.0.0' to allow external access if needed for CORS/network access
    app.run(debug=True)
