const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.Authenticate = (req,res,next)=>{
    try{
        const token= req.header('Authorization');
        //console.log(token);
        if (!token) {
            return res.status(401).json({success:false, message: 'No token provided'})
        }
        const user=jwt.verify(token,'secretkey');
        //console.log(user.userId)
        User.findByPk(user.userId).then(user =>{
            req.user=user;
            next();
        })
        .catch(err => console.log(err))
    }
    catch(err){
        console.log(err);
        res.status(401).json({success:false,message:'failed at auth.js'})
    }
}