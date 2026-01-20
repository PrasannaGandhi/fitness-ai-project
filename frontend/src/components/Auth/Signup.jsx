



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    rePass: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error

    // Validation: Check if passwords match
    if (formData.pass !== formData.rePass) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    // Validation: Name length
    if (formData.name.length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    // SAVING DATA FOR LOGIN CHECKING
    // We save an object containing email and password so Login.jsx can verify them
    const userCredentials = {
      name: formData.name,
      email: formData.email,
      password: formData.pass
    };
    
    localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
    localStorage.setItem("userName", formData.name);
    
    // Redirect to login
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-6 selection:bg-purple-500/30">
      <div className="w-full max-w-md bg-[#121826] border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        
        {/* Background Decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px]"></div>

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Join the FitAI revolution</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-sm animate-pulse">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {/* Name Input */}
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-all" 
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required 
          />

          {/* Email Input */}
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-all" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />

          {/* Password Input with Eye */}
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="Password" 
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-all" 
              onChange={(e) => setFormData({...formData, pass: e.target.value})}
              required 
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Re-enter Password Input with Eye */}
          <div className="relative">
            <input 
              type={showRePass ? "text" : "password"} 
              placeholder="Re-enter Password" 
              className={`w-full bg-black/40 border ${formData.rePass && formData.pass !== formData.rePass ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-all`} 
              onChange={(e) => setFormData({...formData, rePass: e.target.value})}
              required 
            />
            <button
              type="button"
              onClick={() => setShowRePass(!showRePass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
            >
              {showRePass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 shadow-lg shadow-purple-500/20">
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8 text-sm relative z-10">
          Already have an account? <span onClick={() => navigate('/login')} className="text-purple-400 cursor-pointer hover:underline font-bold">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;