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
            alert("user already exists")
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

function generateToken(id,name){
    return jwt.sign({userId : id, name:name},  process.env.TOKEN)
}

module.exports.getUser= async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        if( stringvalid(email)|| stringvalid(password)){
            res.status(500).json({message: 'something missing'})
        }
        const user = await User.findAll({ where: { email } })
        if(user.length > 0){
            bcrypt.compare(password, user[0].password , (err, result)=>{
                if(err){
                    throw new Error('something went wrong ')
                }
                else if(result === true)
                {
                    res.status(200).json({ success: true, message: "user successfully loged in", token: generateToken(user[0].id, user[0].name)})
                }
                else{
                    return res.status(401).json({ success:false, message: " User not authorized"})
                }
            })
        }
        else{
            return res.status(404).json({success: false, message: 'User does not exist'})
        }
    }
    catch(err){
        console.log(err);
    }
}

