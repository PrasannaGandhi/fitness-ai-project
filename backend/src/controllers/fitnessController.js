const User = require('../models/User');
// Placeholder functions for initial setup (will be replaced by full logic later)

const generateDietPlan = (user) => {
    // Basic rule: If user wants to gain muscle, set a high-calorie goal
    const calorieGoal = user.fitnessGoal === 'gain_muscle' ? 2500 : 1800;
    
    return {
        calorieGoal,
        macros: { protein: 'High', carbs: 'Moderate', fats: 'Low' },
        sampleMeal: { breakfast: 'Oatmeal & Eggs', lunch: 'Chicken & Rice', dinner: 'Fish & Veggies' }
    };
};

const generateWorkoutPlan = (user) => {
    // Basic rule: Select a plan type based on user goal/preference (hardcoded)
    const planType = user.fitnessGoal === 'gain_muscle' ? 'Upper/Lower Split' : 'Full Body Workout';
    
    return {
        type: planType,
        schedule: ['Monday (Upper)', 'Tuesday (Lower)', 'Wednesday (Rest)', 'Thursday (Upper)', 'Friday (Lower)'],
    };
};

exports.getFitnessPlan = async (req, res) => {
    try {
        // req.user.id comes from the auth middleware after token verification
        const userId = req.user ? req.user.id : null; 
        
        // Find the user data (needed for weight, height, goal)
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Generate personalized plans
        const dietPlan = generateDietPlan(user);
        const workoutPlan = generateWorkoutPlan(user);

        res.json({
            dietPlan,
            workoutPlan,
            recovery: "Ensure 7-9 hours of sleep and daily stretching."
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
