const User= require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt= require('bcrypt')


function stringvalid(string){
    if(string === undefined || string.length === 0){
        return true;
    }else{
        return false
    }
}

module.exports.postUser = async( req,res,next)=>{
    try{
        const {name,email,number,password} = req.body
        
        if(stringvalid(name) || stringvalid(email)||stringvalid(number)|| stringvalid(password)){
            res.status(500).json({message: 'something missing'})
        }
        const user=await User.findOne({where:{email:email}})
        if(user){
            return res.status(400).json({message:'user alredy exists >>>please try Login'})
        }
        const saltrounds =10;
        bcrypt.hash(password, saltrounds, async(err,hash)=>{
            if(err){
                throw new Error(err)
            }
            
            await User.create({name,email,number,password:hash}).then((user)=>{
                return res.status(200).json({message:'sucessfully created the user'});
            })
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'something went wrong'})
    }
}

