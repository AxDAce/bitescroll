const express= require('express');

const router=express.Router();
const foodPartnerController=require('../controllers/foodPartner.controller')

router.get('/:id',foodPartnerController.Profile);

module.exports=router;