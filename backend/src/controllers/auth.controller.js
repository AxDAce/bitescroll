const userModel=require('../models/user.model')
const foodPartnerModel=require('../models/foodPartner.model')
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken')

//USER

//registerUser
async function registerUser(req,res){

    const {username,email,password}=req.body;
    
    const isUserAlreadyExist=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(401).json({
            message: 'user already exits'
        })
    }


    const hashPassword=await bcrypt.hash(password,10);

    const user= await userModel.create({
        username,
        email,
        password:hashPassword
    })
    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    
    res.cookie('token',token);

    res.status(200).json({
        message:"suer registered successfully"
    })
}


//loginUser
async function loginUser(req,res){
    const {username,email,password}=req.body;
    
    const user=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(401).json({
            message: 'user is not signed'
        })
    }


    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password is not valid"
        })
    }
    
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)
    
    res.cookie('token',token);
  
    res.status(200).json({
        message:"user login successfully"
    })
}


//FOODPARTNER


//registerFoodPartner

async function registerFoodPartner(req,res){
    
    const {foodPartnerName,email,password}=req.body;
    
    const isFoodPartnerAlreadyExist=await foodPartnerModel.findOne({
        $or:[
            {email},
            {foodPartnerName}
        ]
    })

    if(isFoodPartnerAlreadyExist){
        return res.status(401).json({
            message: 'foodPartner already exits'
        })
    }


    const hashPassword=await bcrypt.hash(password,10);

    const foodPartner= await foodPartnerModel.create({
        foodPartnerName,
        email,
        password:hashPassword
    })
    
    const token = jwt.sign({
        id:foodPartner._id
    },process.env.JWT_SECRET)
    
    res.cookie('token',token);

    res.status(200).json({
        message:"foodPartner registered successfully",
        foodPartner
    })
}


loginFoodPartner
async function loginFoodPartner(req,res){
    const {foodPartnerName,email,password}=req.body;
    
    const foodPartner=await foodPartnerModel.findOne({
        $or:[
            {email},
            {foodPartnerName}
        ]
    })

    if(!foodPartner){
        return res.status(401).json({
            message: 'foodPartner is not signed'
        })
    }


    const isPasswordValid=await bcrypt.compare(password,foodPartner.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"password is not valid"
        })
    }
    
    const token = jwt.sign({
        id:foodPartner._id
    },process.env.JWT_SECRET)
    
    res.cookie('token',token);
  
    res.status(200).json({
        message:"foodPartner login successfully",
        foodPartner
    })
}


module.exports={registerUser,loginUser,registerFoodPartner,loginFoodPartner};