// Filename: Dashboard.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import VoiceExpert from "./VoiceExpert"; // Ensure this file exists

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [fitnessData, setFitnessData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // --- Dummy Data for Fallback/Testing ---
  const dummyData = {
    dietPlan: {
      calorieGoal: 2400,
      macros: { protein: "high", carbs: "balanced", fats: "moderate" },
      sampleMeal: {
        breakfast: "Oatmeal with Berries",
        lunch: "Chicken Salad Sandwich",
        dinner: "Grilled Salmon and Asparagus",
      },
    },
    workoutPlan: {
      type: "Push/Pull/Legs",
      schedule: [
        "Monday (Push: Chest, Triceps)",
        "Tuesday (Pull: Back, Biceps)",
        "Wednesday (Rest & Cardio)",
        "Thursday (Legs & Abs)",
        "Friday (Full Body Focus)",
      ],
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect if token missing
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setTimeout(() => navigate("/login"), 1500);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fitness/plan", {
          headers: { "x-auth-token": token },
        });
        setFitnessData(response.data);
      } catch (err) {
        console.error("Failed to fetch fitness plan:", err.message);
        setFitnessData(dummyData); // Use dummy data if API fails
        setError("⚠️ Could not fetch real-time plan from API. Showing sample data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white m-0 p-0 overflow-hidden">
        <h2 className="text-2xl font-semibold animate-pulse">
          Loading Personalized Dashboard...
        </h2>
      </div>
    );
  }

  // --- Error Screen ---
  if (error && !fitnessData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white m-0 p-0 overflow-hidden">
        {error}
      </div>
    );
  }

  // --- Main Dashboard ---
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 md:p-12 m-0 overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-green-400">
          Your Personalized Fitness Dashboard
        </h1>
        <Link
          to="/login"
          onClick={() => localStorage.removeItem("token")}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-300 font-semibold"
        >
          Logout
        </Link>
      </header>

      {/* Error Message Banner */}
      {error && (
        <div className="bg-yellow-800 p-3 rounded-lg mb-6 text-sm font-medium text-yellow-100">
          {error}
        </div>
      )}

      {/* Main Grid Section */}
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Diet Plan Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-pink-500">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">
            🥗 Diet Plan (AI Generated)
          </h2>

          {fitnessData?.dietPlan ? (
            <>
              <p className="mb-2">
                <strong>Calorie Goal:</strong>{" "}
                <span className="text-lg font-bold">
                  {fitnessData.dietPlan.calorieGoal} kcal
                </span>
              </p>
              <p className="mb-4">
                <strong>Macros:</strong> Protein (
                {fitnessData.dietPlan.macros.protein}), Carbs (
                {fitnessData.dietPlan.macros.carbs}), Fats (
                {fitnessData.dietPlan.macros.fats})
              </p>

              <h3 className="text-xl font-medium mt-4 border-t border-gray-600 pt-3">
                Sample Meal Plan:
              </h3>
              <ul className="list-disc list-inside ml-4 text-gray-300">
                <li>Breakfast: {fitnessData.dietPlan.sampleMeal.breakfast}</li>
                <li>Lunch: {fitnessData.dietPlan.sampleMeal.lunch}</li>
                <li>Dinner: {fitnessData.dietPlan.sampleMeal.dinner}</li>
              </ul>
            </>
          ) : (
            <p>No diet plan available.</p>
          )}
        </div>

        {/* Workout Plan Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-t-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4 text-blue-400">
            💪 Workout Plan (AI Generated)
          </h2>

          {fitnessData?.workoutPlan ? (
            <>
              <p className="mb-4">
                <strong>Plan Type:</strong>{" "}
                <span className="font-bold">{fitnessData.workoutPlan.type}</span>
              </p>

              <h3 className="text-xl font-medium mt-4 border-t border-gray-600 pt-3">
                Weekly Schedule:
              </h3>
              <ul className="list-decimal list-inside ml-4 text-gray-300">
                {fitnessData.workoutPlan.schedule.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>No workout plan available.</p>
          )}
        </div>
      </div>

      {/* Voice Expert Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <VoiceExpert />
      </div>

      {/* AI Workout Start Button */}
      <div className="text-center mt-12 pb-12">
        <Link
          to="/workout"
          className="px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 transition duration-300 shadow-xl"
        >
          Start AI-Powered Workout <span className="ml-2">▶️</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
