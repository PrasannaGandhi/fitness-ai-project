const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// Python service endpoint
const PYTHON_TRANSCRIBE_URL = "http://localhost:5001/stt";

// 🧠 Smart Hybrid Fitness AI Response System
const getExpertResponse = (text) => {
  if (!text) return "Sorry, I didn’t catch that. Could you please repeat?";
  text = text.toLowerCase();

  // --- Contextual fitness knowledge base ---
  const responses = {
    diet: "A balanced diet is 70% of your results! Focus on whole foods, lean protein, and avoid processed sugars. Plan your meals to match your fitness goals.",
    calories: "Your caloric intake should align with your goals. For fat loss, eat 400–500 calories below maintenance. For muscle gain, go 300–400 above.",
    protein: "Protein helps repair and grow muscles. Include sources like eggs, chicken, fish, paneer, and lentils after every workout.",
    workout: "Stay consistent! Mix cardio, strength, and flexibility work. Train each muscle group twice a week for steady progress.",
    weights: "Start with compound lifts like squats, bench press, and deadlifts. Increase weights gradually — form always matters more than load.",
    cardio: "For stamina and fat loss, try HIIT or brisk walking 4–5 times a week. Cardio supports heart health and recovery.",
    sleep: "Sleep rebuilds muscles and regulates hormones. Try to maintain 7–9 hours daily — quality sleep equals better recovery.",
    water: "Hydration improves energy, focus, and fat metabolism. Drink 3–4 liters a day, especially before and after workouts.",
    stress: "Too much stress raises cortisol, which slows progress. Include meditation, light yoga, or outdoor walks to manage it.",
    motivation: "Remind yourself why you started. Track small wins, listen to motivating playlists, and surround yourself with positive energy.",
    muscleGain: "Lift progressively, eat a high-protein surplus diet, and rest properly. Patience and discipline are the real growth hacks!",
    fatLoss: "Go for sustainable fat loss. Focus on calorie deficit, resistance training, and sleep. Avoid crash diets.",
    warmup: "Do 5–10 minutes of mobility drills and light cardio before lifting. Stretch after workouts to prevent stiffness.",
    recovery: "Active recovery helps! Try walking, yoga, or foam rolling. Rest is when your body actually grows stronger.",
  };

  // --- Expanded keyword detection ---
  const matched = [];

  const keywordGroups = {
    diet: ["diet", "food", "meal", "nutrition", "eat"],
    calories: ["calorie", "deficit", "surplus", "tdee"],
    protein: ["protein", "supplement", "whey", "shake"],
    workout: ["workout", "exercise", "training", "gym"],
    weights: ["weight", "lift", "strength", "muscle", "resistance"],
    cardio: ["cardio", "run", "jog", "hiit", "treadmill"],
    sleep: ["sleep", "rest", "nap", "recovery night"],
    water: ["water", "drink", "hydration", "hydrate"],
    stress: ["stress", "anxiety", "mental", "burnout"],
    motivation: ["motivation", "lazy", "focus", "tired", "inspire"],
    muscleGain: ["gain muscle", "build muscle", "bulk", "strength gain"],
    fatLoss: ["lose fat", "fat loss", "cutting", "slim"],
    warmup: ["warm up", "warmup", "stretch", "mobility"],
    recovery: ["recovery", "rest day", "healing", "soreness"],
  };

  for (const [key, keywords] of Object.entries(keywordGroups)) {
    if (keywords.some(k => text.includes(k))) matched.push(key);
  }

  // --- Multi-intent combined advice ---
  if (matched.length > 1) {
    const advice = matched.map(key => `• ${responses[key]}`).join("\n\n");
    return `Here’s a custom fitness combo based on your question:\n\n${advice}\n\nStay disciplined and enjoy the process! 💪`;
  }

  // --- Single intent ---
  if (matched.length === 1) {
    return responses[matched[0]];
  }

  // --- Fallback ---
  return "That’s a great question! Try being a bit more specific — for example, ask about diet, motivation, recovery, or workouts.";
};

// 🎤 Voice Query Controller
exports.handleVoiceQuery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio file provided" });
    }

    const audioPath = req.file.path;
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(audioPath));

    console.log("🎤 Sending audio to Python STT service...");

    // Send audio to Python service for transcription
    const response = await axios.post(PYTHON_TRANSCRIBE_URL, formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Python service responded:", response.data);

    const { text } = response.data;
    const expertResponse = getExpertResponse(text);

    res.json({
      transcribedText: text,
      expertReply: expertResponse,
    });

    // Cleanup temp file
    fs.unlink(audioPath, () => {});
  } catch (error) {
    console.error("❌ Error handling voice query:", error.message);
    res.status(500).json({ error: "Error processing audio" });
  }
};
