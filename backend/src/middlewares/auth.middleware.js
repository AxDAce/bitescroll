const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodPartner.model');
const userModel = require('../models/user.model'); // Import your normal user model

// 1. Existing Partner Middleware
async function authFoodMiddleware(req, res, next){
    const token = req.cookies.token;
    
    if(!token){
        return res.status(400).json({ message: "token doesnt exist" });
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decode.id);
        req.foodPartner = foodPartner;
        next();
    }
    catch(e){
        return res.status(400).json({ message: "invalid token" });
    }
}

// 2. New Normal User Middleware
async function authUserMiddleware(req, res, next){
    const token = req.cookies.token;
    
    if(!token){
        return res.status(400).json({ message: "token doesnt exist" });
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // Finds the normal user and attaches it to req.user
        const user = await userModel.findById(decode.id); 
        req.user = user;
        next();
    }
    catch(e){
        return res.status(400).json({ message: "invalid token" });
    }
}

// Export both middlewares
module.exports = { authFoodMiddleware, authUserMiddleware };