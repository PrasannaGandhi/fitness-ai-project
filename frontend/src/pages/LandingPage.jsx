import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, User, Target, Activity, Brain, Heart } from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => {
  const Icon = icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className="bg-gray-800 p-6 rounded-xl shadow-2xl transition duration-300 hover:bg-gray-700/70 border border-gray-700/50"
    >
      <Icon size={32} className="text-purple-400 mb-3" />
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  );
};

const LandingPage = () => (
<div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-black font-sans text-white relative">

    
    {/* --- 1. Navigation Bar --- */}
    <nav className="fixed top-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm shadow-lg z-10 p-4 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6">
        <div className="text-2xl font-extrabold text-purple-400 flex items-center select-none">
          <Target size={28} className="mr-2" />
          AI Fitness Coach
        </div>
        <div className="flex space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition flex items-center text-sm"
          >
            <User size={18} className="mr-1" /> Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-700 transition flex items-center text-sm"
          >
            <ChevronRight size={18} className="mr-1" /> Sign Up
          </Link>
        </div>
      </div>
    </nav>

    {/* --- 2. Hero Section --- */}
    <main className="pt-28 md:pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      <section className="text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
        >
          Personalized Fitness, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
            Powered by AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 max-w-3xl mx-auto text-lg mb-10"
        >
          Get <strong>tailored workout plans</strong>, <strong>smart diet recommendations</strong>, and <strong>real-time form correction</strong> — all in one place. 
          Your ultimate guide to fitness starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/signup"
            className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-purple-700 transition transform hover:scale-105"
          >
            Start Your Free AI Plan Today
            <ChevronRight size={20} className="ml-2" />
          </Link>
        </motion.div>
      </section>

      {/* --- 3. Key Features Section --- */}
      <section className="py-20 border-t border-gray-800/60">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          How We Help You Succeed
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            icon={Activity}
            title="Real-Time Form Correction"
            description="Uses your webcam and AI (MediaPipe) to analyze your posture and provide instant feedback for safe, effective workouts."
          />
          <FeatureCard
            icon={Brain}
            title="AI Voice Expert"
            description="Ask any diet or workout question via voice command and get an instant, expert reply powered by AI."
          />
          <FeatureCard
            icon={Heart}
            title="Personalized Plans"
            description="Generates daily adaptive routines and macro-balanced diet plans based on your unique goals, weight, and progress."
          />
        </div>
      </section>
    </main>

    {/* --- 4. Footer --- */}
    <footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm">
      © {new Date().getFullYear()} AI Fitness Coach · All Rights Reserved
    </footer>
  </div>
);

export default LandingPage;
