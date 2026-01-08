import React, { useState, useRef } from "react";
import axios from "axios";

const VoiceExpert = () => {
  const [status, setStatus] = useState("Ready to record");
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [expertReply, setExpertReply] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // 🎙️ Start Recording
  const handleStart = async () => {
    try {
      setTranscribedText("");
      setExpertReply("");
      setStatus("Listening...");
      setIsListening(true);
      setRecordingTime(0);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();

      // Show recording duration
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access error:", err);
      setStatus("Microphone not accessible ❌");
    }
  };

  // 🛑 Stop Recording & Send to Backend
  const handleStopAndSend = async () => {
    if (!isListening) return;
    setIsListening(false);
    setStatus("Processing audio...");
    clearInterval(timerRef.current);

    mediaRecorderRef.current.stop();

    mediaRecorderRef.current.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      try {
        const res = await axios.post(
          "http://localhost:5000/api/expert/voice",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setTranscribedText(res.data.transcribedText);
        setExpertReply(res.data.expertReply);
        setStatus("Response received ✅");
      } catch (err) {
        console.error(err);
        setStatus("Error processing audio ❌");
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-green-400 p-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-green-300">🎙️ Voice Expert</h1>

        {/* Mic Animation */}
        <div className="flex flex-col items-center mb-4">
          <div
            className={`w-16 h-16 rounded-full mb-2 transition-all ${
              isListening ? "bg-red-500 animate-pulse shadow-lg shadow-red-500/50" : "bg-gray-600"
            }`}
          ></div>
          <p className="text-sm text-gray-400">
            {isListening ? `Listening... (${recordingTime}s)` : "Mic is off"}
          </p>
        </div>

        {/* Status */}
        <p className="text-lg mb-6">
          <span className="font-semibold text-green-300">Status:</span>{" "}
          <span className="text-white">{status}</span>
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleStart}
            disabled={isListening}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              isListening
                ? "bg-green-700 opacity-50 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Start Talking
          </button>

          <button
            onClick={handleStopAndSend}
            disabled={!isListening}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              !isListening
                ? "bg-red-700 opacity-50 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            Stop & Send
          </button>
        </div>

        {/* Expert Response */}
        <div className="bg-gray-700 p-4 rounded-lg text-left text-white">
          <h2 className="font-semibold text-green-300 mb-2">🗣️ Transcribed Text:</h2>
          <p className="mb-4">{transcribedText || "No transcription yet."}</p>

          <h2 className="font-semibold text-green-300 mb-2">💡 Expert Reply:</h2>
          <p>{expertReply || "No reply yet."}</p>
        </div>
      </div>
    </div>
  );
};

export default VoiceExpert;
