from flask import Flask, jsonify, Response
import cv2
import mediapipe as mp
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# -------------------- MediaPipe Init --------------------
mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# -------------------- Global State --------------------
rep_counter = 0
stage = "down"
counter_active = False
feedback = "Press Start to begin workout"
angle_history = []

# ------------------------------------------------------

def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - \
              np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180:
        angle = 360 - angle
    return angle

# -------------------- API CONTROLS --------------------

@app.route('/start_counter', methods=['POST'])
def start_counter():
    global counter_active, rep_counter, stage, feedback, angle_history
    counter_active = True
    rep_counter = 0
    stage = "down"
    angle_history.clear()
    feedback = "Workout started. Extend arms fully."
    return jsonify({"status": "started"})

@app.route('/stop_counter', methods=['POST'])
def stop_counter():
    global counter_active, feedback
    counter_active = False
    feedback = "Workout stopped"
    return jsonify({"status": "stopped"})

@app.route('/ai_status', methods=['GET'])
def ai_status():
    return jsonify({
        "reps": rep_counter,
        "stage": stage,
        "feedback": feedback
    })

# -------------------- VIDEO STREAM --------------------

def generate_frames():
    global rep_counter, stage, counter_active, feedback, angle_history

    cap = cv2.VideoCapture(0)

    with mp_pose.Pose(
        min_detection_confidence=0.7,
        min_tracking_confidence=0.7,
        model_complexity=1
    ) as pose:

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            try:
                landmarks = results.pose_landmarks.landmark

                # -------- LEFT ARM --------
                l_shoulder = [
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y
                ]
                l_elbow = [
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y
                ]
                l_wrist = [
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,
                    landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y
                ]

                left_angle = calculate_angle(l_shoulder, l_elbow, l_wrist)

                # -------- RIGHT ARM --------
                r_shoulder = [
                    landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y
                ]
                r_elbow = [
                    landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y
                ]
                r_wrist = [
                    landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x,
                    landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y
                ]

                right_angle = calculate_angle(r_shoulder, r_elbow, r_wrist)

                # Use arm with more movement
                angle = min(left_angle, right_angle)

                # -------- SMOOTH ANGLE --------
                angle_history.append(angle)
                if len(angle_history) > 5:
                    angle_history.pop(0)

                angle = int(sum(angle_history) / len(angle_history))

                # -------- REP LOGIC --------
                if counter_active:
                    feedback = "Extend arms fully"

                    if angle > 160:
                        stage = "down"
                        feedback = "Arms extended. Curl up!"

                    if angle < 40 and stage == "down":
                        stage = "up"
                        rep_counter += 1
                        feedback = "Great rep! Now extend arms."

                    if angle < 160 and stage == "up":
                        feedback = "Extend arms fully before next rep"

            except:
                if counter_active:
                    feedback = "Adjust camera: full arms not visible"

            # Draw landmarks
            mp_drawing.draw_landmarks(
                image,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(100, 255, 100), thickness=3),
                mp_drawing.DrawingSpec(color=(255, 100, 255), thickness=2)
            )

            ret, buffer = cv2.imencode('.jpg', image)
            frame = buffer.tobytes()

            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n'
            )

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

# -------------------- MAIN --------------------
if __name__ == '__main__':
    app.run(debug=True)
