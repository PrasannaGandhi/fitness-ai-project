import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Workout = () => {
  // Status state reflects the last action taken by the user (Start/Stop)
  const [status, setStatus] = useState("Get Ready");
  const AI_SERVICE_URL = 'http://127.0.0.1:5000';

  const startCounter = async () => {
    try {
      // API call to Python service to activate the counter
      await axios.post(`${AI_SERVICE_URL}/start_counter`);
      setStatus("Counter STARTED. Begin your reps!");
    } catch (error) {
      console.error("Failed to start counter:", error);
      setStatus("Error: Is the Python service running?");
    }
  };

  const stopCounter = async () => {
    try {
      // API call to Python service to deactivate the counter
      await axios.post(`${AI_SERVICE_URL}/stop_counter`);
      setStatus("Counter STOPPED. Rep count is frozen.");
    } catch (error) {
      console.error("Failed to stop counter:", error);
      setStatus("Error stopping counter.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-500">DL Mini Project: Form Correction</h1>
      <p className="mb-4 text-lg text-center font-semibold text-yellow-400">STATUS: {status}</p>
      
      {/* Container for the live video feed from the Python microservice */}
      <div className="border-4 border-white mb-4 shadow-2xl">
        <img src={`${AI_SERVICE_URL}/video_feed`} alt="AI Webcam Feed" className="w-full max-w-xl" />
      </div>
      
      {/* Start/Stop Control Buttons */}
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={startCounter} 
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 font-bold shadow-lg"
        >
          Start Workout
        </button>
        <button 
          onClick={stopCounter} 
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-bold shadow-lg"
        >
          Stop Workout
        </button>
      </div>
      
      {/* Navigation */}
      <Link 
        to="/dashboard" 
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default Workout;
