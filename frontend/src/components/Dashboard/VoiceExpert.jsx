






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mic, MicOff, Volume2, Settings } from 'lucide-react';

const VoiceExpert = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12">
          <ArrowLeft size={20} /> Dashboard
        </button>

        <div className="text-center mb-16">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${isActive ? 'bg-purple-600 shadow-[0_0_50px_rgba(147,51,234,0.5)] scale-110' : 'bg-gray-900 border border-gray-800'}`}>
            {isActive ? <Mic size={48} className="animate-pulse" /> : <MicOff size={48} className="text-gray-600" />}
          </div>
          <h1 className="text-4xl font-bold mb-4">Voice <span className="text-purple-500">Expert</span></h1>
          <p className="text-gray-400 max-w-md mx-auto">Hands-free control for your workout. Command the AI to start, stop, or provide form feedback.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Volume2 size={18} className="text-purple-500"/> Voice Commands</h3>
            <ul className="text-sm text-gray-400 space-y-3">
              <li>"Hey FitAI, start my workout"</li>
              <li>"How is my posture?"</li>
              <li>"Next exercise"</li>
              <li>"Pause session"</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Settings size={18} className="text-purple-500"/> Expert Settings</h3>
            <p className="text-sm text-gray-400 mb-4">Voice Gender: Female (Sarah)</p>
            <button className="text-xs text-purple-400 font-bold uppercase tracking-widest">Change Settings</button>
          </div>
        </div>

        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${isActive ? 'bg-red-500/10 text-red-500 border border-red-500/50' : 'bg-purple-600 text-white'}`}
        >
          {isActive ? "Deactivate Voice Control" : "Activate Hands-Free Mode"}
        </button>
      </div>
    </div>
  );
};

export default VoiceExpert;