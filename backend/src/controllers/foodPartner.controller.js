const foodPartnerModel = require('../models/foodPartner.model');
const foodModel = require('../models/food.model');

async function Profile(req, res) {
    try {
        const id = req.params.id;

        const foodPartner = await foodPartnerModel.findById(id);

        // 1. If the partner doesn't exist (e.g., was deleted), stop the function and return a 404
        if (!foodPartner) {
            return res.status(404).json({ message: "Food Partner not found" });
        }

        const foodItems = await foodModel.find({
            foodPartner: id
        });

        res.status(200).json({
            message: "profile found",
            foodPartner: {
                ...foodPartner.toObject(),
                foodItems: foodItems
            }
        });
        
    } catch (error) {
        // 2. If the ID format is invalid or the database connection drops, catch it here
        console.error("Profile Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { Profile };