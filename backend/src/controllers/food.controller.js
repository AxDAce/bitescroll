const foodModel=require('../models/food.model');
const {uploadFile}=require('../service/storage.service')
const{v4:uuid}= require("uuid")
const likeModel=require('../models/like.model')
const saveModel=require('../models/save.model')

async function createFood(req,res){
    
    const result= await uploadFile(req.file.buffer)

    const foodItem= await foodModel.create({
        name:req.body.name,
        video:result.url,
        description:req.body.description,
        foodPartner:req.foodPartner._id
    })

    res.status(202).json({
        message:"food created",
        food:foodItem
    })
}

async function getFood(req,res){
    const foodList= await foodModel.find()

    res.status(200).json({
        message:"food items",
        foodItems:foodList
    })
}


async function likeFood(req,res){
    const {foodId}= req.body;
    
    const user =req.user;

    const isLikeAlreadyExists= await likeModel.findOne({
        userId:user._id,
        foodId:foodId
    })

    if(isLikeAlreadyExists){
        await likeModel.deleteOne({
            userId:user._id,
            foodId:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likeCount:-1}
        })

        return res.status(200).json({
            message:"like deleted successfully"
        })
    }
    
    const likeSaved=await likeModel.create({
        userId:user._id,
        foodId:foodId
    })

    await foodModel.findByIdAndUpdate(foodId,{
        $inc:{likeCount: 1}
    })

    res.status(200).json({
        message:"liked successfully",
        likeSaved
    })
}

async function saveFood(req,res){
    const {foodId}= req.body;
    
    const user =req.user;

    const isSaveAlreadyExists= await saveModel.findOne({
        userId:user._id,
        foodId:foodId
    })

    if(isSaveAlreadyExists){
        await saveModel.deleteOne({
            userId:user._id,
            foodId:foodId
        })

        return res.status(200).json({
            message:"save deleted successfully"
        })
    }
    
    const save=await saveModel.create({
        userId:user._id,
        foodId:foodId
    })

    res.status(200).json({
        message:"saved successfully",
        save
    })
}


module.exports={createFood,getFood,likeFood,saveFood};