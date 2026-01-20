




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (isForgot) {
      alert("Reset link sent to your email!");
      setIsForgot(false);
    } else {
      // 1. Get user data from localStorage (stored during Signup)
      const storedUser = JSON.parse(localStorage.getItem("userCredentials"));

      // 2. Validation Logic
      if (!storedUser) {
        setError("No account found with this email. Please sign up.");
        return;
      }

      if (storedUser.email !== email || storedUser.password !== password) {
        setError("Invalid email or password");
        return;
      }

      // 3. Successful Login
      localStorage.setItem("userName", storedUser.name || "User");
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F14] flex items-center justify-center p-6 selection:bg-purple-500/30">
      <div className="w-full max-w-md bg-[#121826] border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px]"></div>

        <div className="text-center mb-8 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isForgot ? "Reset Password" : "Welcome Back"}
          </h2>
          <p className="text-gray-400 text-sm">
            {isForgot ? "Enter your email to receive a reset link" : "Login to your FitAI coach"}
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20 text-sm animate-shake">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4 relative z-10">
          <div className="space-y-1">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          {!isForgot && (
            <>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                {/* Eye Icon Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex justify-between items-center px-1">
                <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer group">
                  <input type="checkbox" className="accent-purple-500 w-4 h-4 rounded border-gray-700 bg-black" />
                  <span className="group-hover:text-gray-300 transition-colors">Remember Me</span>
                </label>
                <span 
                  onClick={() => setIsForgot(true)} 
                  className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer font-medium"
                >
                  Forgot password?
                </span>
              </div>
            </>
          )}
          
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 shadow-lg shadow-purple-500/20">
            {isForgot ? "Send Reset Link" : "Login"}
          </button>
        </form>

        <div className="text-center mt-8 relative z-10">
          <div className="text-gray-500 text-sm">
            {isForgot ? (
              <span onClick={() => setIsForgot(false)} className="text-purple-400 cursor-pointer hover:underline">
                Back to Login
              </span>
            ) : (
              <p>
                Don’t have an account?{" "}
                <span 
                  onClick={() => navigate('/signup')} 
                  className="text-purple-400 cursor-pointer hover:underline font-bold"
                >
                  Sign up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;