const express= require('express');

const router=express.Router();
const foodController=require('../controllers/food.controller')
const { authFoodMiddleware, authUserMiddleware } = require('../middlewares/auth.middleware');
const multer=require('multer')

const upload=multer({
    storage:multer.memoryStorage()
})

router.post('/',authFoodMiddleware,upload.single("video"),foodController.createFood);

router.get('/',foodController.getFood);

router.post('/like',authUserMiddleware,foodController.likeFood);

router.post('/save',authUserMiddleware,foodController.saveFood);

module.exports=router;