import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    fitnessGoal: '',
    weight: '',
    height: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log(res.data);
      alert('Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      console.error(err.response.data);
      alert('Registration failed. Please check your details.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>
        <div className="mb-4">
          <label className="block text-gray-400">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 mt-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 mt-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 mt-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Fitness Goal</label>
          <select name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange} className="w-full px-4 py-2 mt-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select a Goal</option>
            <option value="lose_weight">Lose Weight</option>
            <option value="gain_muscle">Gain Muscle</option>
            <option value="maintain">Maintain</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Weight (kg)</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full px-4 py-2 mt-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400">Height (cm)</label>
          <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full px-4 py-2 mt-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <button type="submit" className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;