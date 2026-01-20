


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Mic, Info, Play } from "lucide-react";

const Workout = () => {
  const navigate = useNavigate();
  const [reps, setReps] = useState(0);
  const [postureScore, setPostureScore] = useState(85);
  const [isStarted, setIsStarted] = useState(false);

  const handleSimulateRep = () => {
    setReps((prev) => prev + 1);
    const newScore = Math.floor(Math.random() * (98 - 80 + 1)) + 80;
    setPostureScore(newScore);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => navigate("/dashboard")} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <div className={`w-2 h-2 ${isStarted ? 'bg-green-500 animate-pulse' : 'bg-gray-600'} rounded-full`}></div>
          <span className="text-sm font-medium">{isStarted ? 'AI Detection Active' : 'Camera Ready'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative aspect-video bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden flex items-center justify-center shadow-2xl">
            {!isStarted ? (
              <div className="text-center p-8">
                <Camera size={64} className="text-gray-700 mx-auto mb-4" />
                <button 
                  onClick={() => setIsStarted(true)}
                  className="px-8 py-3 bg-purple-600 rounded-xl font-bold hover:bg-purple-500 transition-all flex items-center gap-2 mx-auto"
                >
                  <Play size={18} fill="white"/> Begin Analysis
                </button>
              </div>
            ) : (
              <>
                <div className="absolute inset-0 border-2 border-purple-500/20 m-12 rounded-lg pointer-events-none border-dashed animate-pulse"></div>
                <p className="text-gray-500">Live AI Feed (Webcam)</p>
                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-gray-700 text-center min-w-[120px]">
                  <h4 className="text-4xl font-black text-purple-500">{reps}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">of 15 Reps</p>
                </div>
                <div className="absolute top-6 right-6 bg-green-500/10 border border-green-500/50 px-4 py-2 rounded-xl backdrop-blur-md">
                  <span className="text-green-500 font-bold text-sm">Posture: {postureScore}%</span>
                </div>
              </>
            )}
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 rounded-2xl border border-gray-700 flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-xl"><Info className="text-purple-400" /></div>
            <div>
              <p className="text-sm text-purple-400 font-bold uppercase tracking-wider">AI Feedback</p>
              <p className="text-lg text-gray-200">
                {isStarted ? (postureScore > 90 ? "Excellent form!" : "Keep your back straight and core engaged.") : "Stand 1-2m away to begin."}
              </p>
            </div>
            {isStarted && (
              <button onClick={handleSimulateRep} className="ml-auto px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-bold transition-all">
                Simulate Rep
              </button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Current Exercise</h3>
            <h2 className="text-2xl font-bold mb-4">Push-ups</h2>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${(reps / 15) * 100}%` }}></div>
            </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Guidelines</h3>
            <ul className="space-y-4">
              {["Shoulder-width hands", "Body straight", "Full depth"].map((step, i) => (
                <li key={i} className="flex gap-4 text-sm text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workout;