


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dumbbell, TrendingUp, LogOut, Edit3, Play, 
  Camera, X, User, Target, Ruler, Scale, Utensils, 
  Mic, MessageSquare, Flame, CheckCircle, ChevronRight, 
  Droplets, Zap, Info, History, Save, Mail, Calendar
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [showEditForm, setShowEditForm] = useState(false); 
  const [showGoalModal, setShowGoalModal] = useState(false); // Separate Goal Modal
  const [showHeightModal, setShowHeightModal] = useState(false); // New Height Modal
  const [showWeightModal, setShowWeightModal] = useState(false); // New Weight Modal
  const [showHistoryModal, setShowHistoryModal] = useState(false); 
  
  const [profile, setProfile] = useState({
    goal: localStorage.getItem("userGoal") || "Fat Loss",
    height: localStorage.getItem("userHeight") || "170",
    weight: localStorage.getItem("userWeight") || "70",
    age: localStorage.getItem("userAge") || "24",
    gender: localStorage.getItem("userGender") || "Male",
    email: localStorage.getItem("userEmail") || "user@example.com",
    extraInfo: localStorage.getItem("userExtra") || "Home Training Mode"
  });

  const [historyData] = useState([
    { id: 1, date: "Today", activity: "Fat Blast HIIT", status: "Completed" },
    { id: 2, date: "Yesterday", activity: "Strength Training", status: "Completed" },
    { id: 3, date: "22 Jan", activity: "Morning Yoga", status: "Completed" }
  ]);

  useEffect(() => {
    const currentLoggedUser = localStorage.getItem("userName") || "Guest";
    setUserName(currentLoggedUser);
    const storedAvatar = localStorage.getItem("userAvatar");
    setUserAvatar(storedAvatar);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate('/');
  };

  const handleImageClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserAvatar(reader.result);
        localStorage.setItem("userAvatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    localStorage.setItem("userHeight", profile.height);
    localStorage.setItem("userWeight", profile.weight);
    localStorage.setItem("userAge", profile.age);
    localStorage.setItem("userGender", profile.gender);
    localStorage.setItem("userEmail", profile.email);
    localStorage.setItem("userExtra", profile.extraInfo);
    setShowEditForm(false);
  };

  const handleGoalSave = (newGoal) => {
    setProfile({...profile, goal: newGoal});
    localStorage.setItem("userGoal", newGoal);
    setShowGoalModal(false);
  };

  // Generic updater for height/weight modals
  const updateQuickStat = (key, val) => {
    setProfile({...profile, [key]: val});
    localStorage.setItem(`user${key.charAt(0).toUpperCase() + key.slice(1)}`, val);
  };

  const getDailyRequirements = () => {
    const weight = parseFloat(profile.weight) || 70;
    const goal = profile.goal.toLowerCase();
    let protein, water, calTarget, plan;

    if (goal.includes("fat")) {
      protein = Math.round(weight * 1.8); water = 3.5; calTarget = 1800;
      plan = { title: "Fat Blast HIIT", burn: "450 kcal", exercises: [{ name: "Jumping Jacks", dur: "60s", img: "🏃" }, { name: "Burpees", dur: "12 reps", img: "💥" }, { name: "Mountain Climbers", dur: "45s", img: "⛰️" }, { name: "Plank To Pushup", dur: "10 reps", img: "🤸" }] };
    } else if (goal.includes("muscle") || goal.includes("gain")) {
      protein = Math.round(weight * 2.2); water = 4.5; calTarget = 2800;
      plan = { title: "Home Strength Builder", burn: "350 kcal", exercises: [{ name: "Decline Pushups", dur: "15 reps", img: "💪" }, { name: "Bulgarian Split Squats", dur: "12/side", img: "🦵" }, { name: "Pike Pushups", dur: "10 reps", img: "📐" }, { name: "Dips (Chair)", dur: "15 reps", img: "🪑" }] };
    } else {
      protein = Math.round(weight * 1.6); water = 3.0; calTarget = 2200;
      plan = { title: "Functional Longevity", burn: "300 kcal", exercises: [{ name: "Bodyweight Squats", dur: "20 reps", img: "🏋️" }, { name: "Standard Pushups", dur: "15 reps", img: "✨" }, { name: "Bird Dog", dur: "12 reps", img: "🐕" }, { name: "Superman", dur: "30s", img: "🦸" }] };
    }
    return { protein, water, calTarget, plan };
  };

  const { protein, water, calTarget, plan } = getDailyRequirements();

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E5E7EB] p-4 md:p-10 font-sans relative pb-20">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-5">
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#7C3AED] p-1 bg-[#121826] cursor-pointer group" onClick={handleImageClick}>
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#0B0F14]">
              {userAvatar ? <img src={userAvatar} className="w-full h-full object-cover" alt="avatar" /> : <User size={28} className="text-[#6B7280]" />}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={16} className="text-white" />
            </div>
            <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">Hey, <span className="text-[#7C3AED]">{userName}</span></h1>
              <button onClick={() => setShowEditForm(true)}><Edit3 size={16} className="text-gray-500 hover:text-white"/></button>
            </div>
            <p className="text-[#9CA3AF] text-xs">{profile.gender} • {profile.age} yrs • {profile.goal}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="bg-[#121826] border border-[#1F2937] px-4 py-2 rounded-xl text-[#EF4444] text-sm font-bold flex items-center gap-2">
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* STATS STRIP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#121826] border border-[#1F2937] p-5 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#0B0F14] p-3 rounded-2xl"><Target className="text-[#22C55E]"/></div>
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase font-black">Current Objective</p>
                <h3 className="text-xl font-bold">{profile.goal}</h3>
              </div>
            </div>
            <button onClick={() => setShowGoalModal(true)} className="p-2 hover:bg-[#1F2937] rounded-xl transition-colors">
              <Edit3 size={16} className="text-[#7C3AED]" />
            </button>
        </div>

        <div className="bg-[#121826] border border-[#1F2937] p-5 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#0B0F14] p-3 rounded-2xl"><Ruler className="text-[#7C3AED]"/></div>
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase font-black">Height (cm)</p>
                <h3 className="text-xl font-bold">{profile.height}</h3>
              </div>
            </div>
            <button onClick={() => setShowHeightModal(true)} className="p-2 hover:bg-[#1F2937] rounded-xl transition-colors">
              <Edit3 size={16} className="text-[#7C3AED]" />
            </button>
        </div>

        <div className="bg-[#121826] border border-[#1F2937] p-5 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#0B0F14] p-3 rounded-2xl"><Scale className="text-[#7C3AED]"/></div>
              <div>
                <p className="text-[10px] text-[#6B7280] uppercase font-black">Weight (kg)</p>
                <h3 className="text-xl font-bold">{profile.weight}</h3>
              </div>
            </div>
            <button onClick={() => setShowWeightModal(true)} className="p-2 hover:bg-[#1F2937] rounded-xl transition-colors">
              <Edit3 size={16} className="text-[#7C3AED]" />
            </button>
        </div>
      </div>

      {/* WORKOUT & CALORIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div onClick={() => { setShowModal(true); setModalStep(1); }} className="lg:col-span-2 bg-gradient-to-br from-[#7C3AED] to-[#4338CA] p-8 rounded-[2.5rem] cursor-pointer hover:shadow-2xl transition-all relative overflow-hidden group">
          <div className="z-10 relative">
            <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] font-bold mb-4">TODAY'S MISSION</div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">{plan.title}</h2>
            <p className="mt-4 flex items-center gap-2 font-bold text-indigo-100"><Zap size={18} fill="currentColor"/> Begin Session • {plan.burn}</p>
          </div>
          <Dumbbell size={200} className="absolute -bottom-10 -right-10 text-white/5 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
        </div>

        <div className="bg-[#121826] border border-[#1F2937] p-8 rounded-[2.5rem]">
          <h2 className="text-xs font-black uppercase text-gray-500 mb-6 tracking-widest">Energy Intake</h2>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-black text-white">0 <span className="text-sm text-gray-500">/ {calTarget} kcal</span></p>
              <p className="text-[10px] font-bold text-[#7C3AED]">DAILY GOAL</p>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-gray-800 flex items-center justify-center text-[10px] font-bold">0%</div>
          </div>
        </div>
      </div>

      {/* EXERCISES & NUTRITION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#6B7280] mb-4">Exercise Sequence</h2>
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 no-scrollbar">
            {plan.exercises.map((ex, idx) => (
              <div key={idx} className="bg-[#121826]/60 border border-[#1F2937] p-4 rounded-2xl flex items-center gap-4">
                <span className="text-2xl">{ex.img}</span>
                <div className="flex-grow">
                  <h4 className="font-bold text-sm text-white">{ex.name}</h4>
                  <p className="text-[10px] text-gray-500">{ex.dur}</p>
                </div>
                <div className="bg-[#0B0F14] p-2 rounded-lg text-[#7C3AED]"><ChevronRight size={14}/></div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#6B7280] mb-0.5">Calculated Nutrition</h2>
          <div className="bg-[#121826] border border-[#1F2937] p-6 rounded-[2rem] flex items-center gap-6">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><Droplets size={24} /></div>
            <div className="flex-grow"><h4 className="font-bold text-sm">Hydration</h4><p className="text-xl font-black">{water}L</p></div>
          </div>
          <div className="bg-[#121826] border border-[#1F2937] p-6 rounded-[2rem] flex items-center gap-6">
            <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400"><Utensils size={24} /></div>
            <div className="flex-grow"><h4 className="font-bold text-sm">Protein</h4><p className="text-xl font-black">{protein}g</p></div>
          </div>
        </div>
      </div>

      {/* ACTION BOXES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Diet AI", icon: <Utensils size={28}/>, path: '/diet' }, 
          { name: "Chat", icon: <MessageSquare size={28}/>, path: '/chat' }, 
          { name: "Voice", icon: <Mic size={28}/>, path: '/voice' }, 
          { name: "View History", icon: <History size={28}/>, action: () => setShowHistoryModal(true) }
        ].map((t, i) => (
          <div key={i} onClick={t.action || (() => navigate(t.path))} className="bg-[#121826] p-6 rounded-2xl border-2 border-[#1F2937] flex flex-col items-center gap-3 cursor-pointer hover:border-[#7C3AED] transition-all">
            <div className="text-[#7C3AED]">{t.icon}</div>
            <span className="text-[11px] font-black uppercase tracking-wider">{t.name}</span>
          </div>
        ))}
      </div>

      {/* INDIVIDUAL GOAL EDIT MODAL */}
      {showGoalModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121826] border border-[#1F2937] w-full max-w-sm rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic">UPDATE GOAL</h3>
              <button onClick={() => setShowGoalModal(false)}><X/></button>
            </div>
            <div className="space-y-3">
              {["Fat Loss", "Muscle Gain", "Maintenance"].map((g) => (
                <button 
                  key={g}
                  onClick={() => handleGoalSave(g)}
                  className={`w-full p-4 rounded-2xl font-bold border ${profile.goal === g ? 'bg-[#7C3AED] border-[#7C3AED]' : 'bg-[#0B0F14] border-[#1F2937] hover:border-[#7C3AED]'}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEW: HEIGHT EDIT MODAL */}
      {showHeightModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121826] border border-[#1F2937] w-full max-w-sm rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic">UPDATE HEIGHT</h3>
              <button onClick={() => setShowHeightModal(false)}><X/></button>
            </div>
            <input 
              type="number" 
              className="w-full bg-[#0B0F14] border border-[#1F2937] p-4 rounded-2xl text-center text-3xl font-bold outline-none focus:border-[#7C3AED]"
              value={profile.height}
              onChange={(e) => updateQuickStat("height", e.target.value)}
            />
            <button onClick={() => setShowHeightModal(false)} className="w-full py-4 bg-[#7C3AED] rounded-xl font-black mt-4">DONE</button>
          </div>
        </div>
      )}

      {/* NEW: WEIGHT EDIT MODAL */}
      {showWeightModal && (
        <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121826] border border-[#1F2937] w-full max-w-sm rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic">UPDATE WEIGHT</h3>
              <button onClick={() => setShowWeightModal(false)}><X/></button>
            </div>
            <input 
              type="number" 
              className="w-full bg-[#0B0F14] border border-[#1F2937] p-4 rounded-2xl text-center text-3xl font-bold outline-none focus:border-[#7C3AED]"
              value={profile.weight}
              onChange={(e) => updateQuickStat("weight", e.target.value)}
            />
            <button onClick={() => setShowWeightModal(false)} className="w-full py-4 bg-[#7C3AED] rounded-xl font-black mt-4">DONE</button>
          </div>
        </div>
      )}

      {/* PROFILE EDIT MODAL */}
      {showEditForm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#121826] border border-[#1F2937] w-full max-w-md rounded-[2.5rem] p-8 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic">EDIT PROFILE</h3>
              <button onClick={() => setShowEditForm(false)}><X/></button>
            </div>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Full Name</label>
                <input className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none focus:border-[#7C3AED]" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Email Address</label>
                <input className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none focus:border-[#7C3AED]" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Age</label>
                  <input type="number" className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none" value={profile.age} onChange={(e) => setProfile({...profile, age: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Gender</label>
                  <select className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none text-white appearance-none" value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Height (cm)</label>
                  <input className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none" value={profile.height} onChange={(e) => setProfile({...profile, height: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Weight (kg)</label>
                  <input className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none" value={profile.weight} onChange={(e) => setProfile({...profile, weight: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase ml-2">Extra Info / Bio</label>
                <input className="w-full bg-[#0B0F14] border border-[#1F2937] p-3 rounded-xl mt-1 outline-none" value={profile.extraInfo} onChange={(e) => setProfile({...profile, extraInfo: e.target.value})} />
              </div>
              <button type="submit" className="w-full py-4 bg-[#7C3AED] rounded-xl font-black mt-4 uppercase">Save Profile</button>
            </form>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121826] border border-[#1F2937] w-full max-w-md rounded-[2.5rem] p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black italic">WORKOUT HISTORY</h3>
              <button onClick={() => setShowHistoryModal(false)}><X/></button>
            </div>
            <div className="space-y-3">
              {historyData.map(h => (
                <div key={h.id} className="bg-[#0B0F14] p-4 rounded-2xl border border-[#1F2937] flex justify-between">
                  <div>
                    <p className="font-bold text-sm">{h.activity}</p>
                    <p className="text-[10px] text-gray-500">{h.date}</p>
                  </div>
                  <span className="text-[10px] text-green-500 font-bold uppercase">{h.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Camera/Setup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="bg-[#121826] border border-[#1F2937] w-full max-w-md rounded-[3rem] p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-gray-500"><X size={24}/></button>
            {modalStep === 1 ? (
              <div className="animate-in fade-in zoom-in duration-300">
                <div className="bg-indigo-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-6 mx-auto text-[#7C3AED]"><Info size={40} /></div>
                <h3 className="text-2xl font-black text-center mb-2 uppercase italic">Camera Setup</h3>
                <p className="text-[#9CA3AF] text-center text-sm mb-6">Track your form accurately:</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex gap-3 text-xs bg-[#0B0F14] p-3 rounded-xl border border-[#1F2937]"><div className="text-[#22C55E]">01</div><span>Place phone vertically against a wall.</span></li>
                  <li className="flex gap-3 text-xs bg-[#0B0F14] p-3 rounded-xl border border-[#1F2937]"><div className="text-[#22C55E]">02</div><span>Stand 6-8 feet back.</span></li>
                </ul>
                <button onClick={() => setModalStep(2)} className="w-full py-5 bg-white text-black rounded-2xl font-black uppercase transition-all active:scale-95">I'm Ready</button>
              </div>
            ) : (
              <div className="animate-in slide-in-from-bottom-4 duration-300 text-center">
                <div className="bg-[#7C3AED] w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-[0_0_30px_rgba(124,58,237,0.5)]"><Camera size={40} className="text-white" /></div>
                <h3 className="text-2xl font-black mb-4 italic uppercase">Ready To Go?</h3>
                <button onClick={() => navigate('/workout')} className="w-full py-5 bg-[#7C3AED] text-white rounded-2xl font-black uppercase tracking-widest">Start AI Camera</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
};

export default Dashboard;