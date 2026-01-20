

import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Workout from "./components/Workout/Workout";
import DietPlan from "./components/Dashboard/DietPlan";
import VoiceExpert from "./components/Dashboard/VoiceExpert";
import WorkoutPlan from "./components/Dashboard/WorkoutPlan";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Chatbot from "./components/Dashboard/Chatbot";
import History from "./components/Dashboard/History";
import Profile from "./components/Dashboard/Profile";
import WhyChooseUs from './components/Dashboard/WhyChooseUs';
import DemoPage from './components/Dashboard/DemoPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/workout" element={<ProtectedRoute><Workout /></ProtectedRoute>} />
      <Route path="/diet" element={<ProtectedRoute><DietPlan /></ProtectedRoute>} />
      <Route path="/voice" element={<ProtectedRoute><VoiceExpert /></ProtectedRoute>} />
      <Route path="/workout-plan" element={<ProtectedRoute><WorkoutPlan /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      
<Route path="/why-fitai" element={<ProtectedRoute><WhyChooseUs /></ProtectedRoute>} />
  <Route path="/demo" element={<ProtectedRoute><DemoPage /></ProtectedRoute>} />
      
<Route path="/chat" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
<Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
















