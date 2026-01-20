import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Utensils, Flame, Leaf } from 'lucide-react';

const DietPlan = () => {
  const navigate = useNavigate();

  const meals = [
    { time: "Breakfast", meal: "Oatmeal with protein powder & berries", cal: 450, macros: "P: 30g | C: 50g | F: 10g" },
    { time: "Lunch", meal: "Grilled Chicken Salad with Avocado", cal: 550, macros: "P: 45g | C: 15g | F: 22g" },
    { time: "Snack", meal: "Greek Yogurt & Almonds", cal: 200, macros: "P: 15g | C: 10g | F: 8g" },
    { time: "Dinner", meal: "Baked Salmon & Steamed Broccoli", cal: 500, macros: "P: 40g | C: 10g | F: 25g" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Nutrition Plan</span></h1>
            <p className="text-gray-400">Personalized for Fat Loss goal</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase font-bold">Daily Target</p>
              <p className="text-xl font-bold text-emerald-400">1,700 kcal</p>
            </div>
            <Flame className="text-emerald-500" size={32} />
          </div>
        </div>

        <div className="space-y-4">
          {meals.map((item, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center hover:border-emerald-500/50 transition-all">
              <div className="flex gap-4 items-center">
                <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-500">
                  <Utensils size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.time}</h3>
                  <p className="text-gray-400">{item.meal}</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-left md:text-right">
                <p className="font-mono text-emerald-400">{item.cal} kcal</p>
                <p className="text-xs text-gray-500">{item.macros}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietPlan;