const Messages = require('../models/message');
const User= require('../models/user');

module.exports.addMessage= async (req,res,next)=>{
    try{
        const userId = req.user.id;
        const {msg} = req.body;
        console.log(userId,msg,'real');
        await Messages.create({
            messages:msg,
            userId:userId
        })
        return res.status(200).json({success:true,message:'message successfully stored'})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({succes:false,message:'unable to store msg in database'})
    }
}
module.exports.getMessages = async(req,res)=>{
    try{
        const allMessages = await Messages.findAll({
            attributes: ['messages'],
            include: [{
                model: User,
                attributes: ['name'] 
            }]
        });
        return res.status(200).json({ message: allMessages });
    }
    catch(err){
        console.log(err);
        res.status(401).json({ message: 'failed to get messages' });
    }
}





