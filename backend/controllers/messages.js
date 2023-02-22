const Messages = require('../models/message');


module.exports.addMessage= async (req,res,next)=>{
    try{
        const userId = req.user.id;
        const {msg} = req.body;
        console.log(userId,msg);
        await Messages.create({
            messages:msg,
            id:userId
        })
        return res.status(200).json({success:true,message:'message successfully stored'})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({succes:false,message:'unable to store msg in database'})
    }
}