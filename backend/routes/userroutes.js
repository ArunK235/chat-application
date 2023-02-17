const express = require('express');
const router=express.Router();


const userController=require('../controllers/user');

router.post("/signup", userController.postUser);

router.post("/login",userController.getUser);

module.exports=router;