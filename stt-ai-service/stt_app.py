# Filename: stt_app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from pydub import AudioSegment
from pydub.utils import which
import os
import tempfile
import time

# ✅ Force pydub to use correct ffmpeg/ffprobe paths
ffmpeg_path = r"C:\ffmpeg-2025-10-27-git-68152978b5-essentials_build\bin\ffmpeg.exe"
ffprobe_path = r"C:\ffmpeg-2025-10-27-git-68152978b5-essentials_build\bin\ffprobe.exe"

AudioSegment.converter = ffmpeg_path
AudioSegment.ffmpeg = ffmpeg_path
AudioSegment.ffprobe = ffprobe_path

# ✅ Add them to environment variables for subprocess calls
os.environ["PATH"] += os.pathsep + os.path.dirname(ffmpeg_path)
os.environ["FFMPEG_BINARY"] = ffmpeg_path
os.environ["FFPROBE_BINARY"] = ffprobe_path

print(f"✅ FFmpeg path set to: {AudioSegment.ffmpeg}")
print(f"✅ FFprobe path set to: {AudioSegment.ffprobe}")

app = Flask(__name__)
CORS(app)

recognizer = sr.Recognizer()


@app.route("/stt", methods=["POST"])
def transcribe_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    audio_file = request.files["audio"]
    temp_wav_path = tempfile.mktemp(suffix=".wav")

    try:
        # Save uploaded file
        audio_file.save(temp_wav_path)

        # ✅ Ensure correct format using pydub
        sound = AudioSegment.from_file(temp_wav_path)
        sound.export(temp_wav_path, format="wav")

        # ✅ Speech recognition
        with sr.AudioFile(temp_wav_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)

        # ✅ Clean up file safely
        time.sleep(1)
        try:
            os.remove(temp_wav_path)
        except Exception as cleanup_err:
            print(f"⚠️ Cleanup failed: {cleanup_err}")

        return jsonify({"text": text})

    except sr.UnknownValueError:
        time.sleep(1)
        if os.path.exists(temp_wav_path):
            try:
                os.remove(temp_wav_path)
            except Exception:
                pass
        return jsonify({"error": "Could not understand the audio"}), 400

    except sr.RequestError as e:
        time.sleep(1)
        if os.path.exists(temp_wav_path):
            try:
                os.remove(temp_wav_path)
            except Exception:
                pass
        return jsonify({"error": f"Speech recognition service error: {e}"}), 500

    except Exception as e:
        time.sleep(1)
        if os.path.exists(temp_wav_path):
            try:
                os.remove(temp_wav_path)
            except Exception:
                pass
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=False)
