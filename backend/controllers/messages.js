const Messages = require('../models/message');
const User= require('../models/user');
const group = require('../models/group')

module.exports.addMessage= async (req,res,next)=>{
    try{
        const userId = req.user.id;
        const {msg} = req.body;
        const groupId = Number(req.params.id)
        console.log(req.params.id,'group id here')
        //console.log(userId,msg,'real');
        const  result =await Messages.create({
            messages:msg,
            userId:userId,
            groupId:groupId
        })
        console.log(result);
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

module.exports.getAllMessages= async(req,res)=>{
    try{
        const groupId = req.query.groupId
        const skipnumber = Number(req.query.id)
        //console.log(skipnumber,'skipnumber')
        if(skipnumber >= 10){
            const skip= skipnumber-10
            let offset = skip
            const allMsgs= await Messages.findAll(
                {where:{groupId:groupId},attributes:['id','messages'],offset:offset,
                include:[{model:User,attributes:['name']}]})
                return res.status(200).json({message:allMsgs})
        }
        const allmsgs= await Messages.findAll(
            {where:{groupId:groupId},attributes:['id','messages'],
            include:[{model:User,attributes:['name']}]})
            return res.status(200).json({message:allmsgs})
        

    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:'something went wrong'})
    }
}





