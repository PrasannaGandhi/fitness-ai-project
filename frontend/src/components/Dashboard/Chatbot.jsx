import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Bot } from 'lucide-react';

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your FitAI Assistant. How can I help with your workout today?' }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    // Fake bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', text: "That's a great fitness question! Let me check your current diet plan for the best advice..." }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="p-6 border-b border-gray-800 flex items-center gap-4">
        <ArrowLeft onClick={() => navigate('/dashboard')} className="cursor-pointer" />
        <Bot className="text-purple-500" />
        <h1 className="text-xl font-bold">FitAI Coach Chat</h1>
      </div>

      <div className="flex-grow p-6 overflow-y-auto space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-purple-600' : 'bg-gray-900 border border-gray-800'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-900 border-t border-gray-800 flex gap-4">
        <input 
          className="flex-grow bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
          placeholder="Ask about exercises, diet, or reps..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="bg-purple-600 p-3 rounded-xl"><Send size={20}/></button>
      </div>
    </div>
  );
};

export default Chatbot;