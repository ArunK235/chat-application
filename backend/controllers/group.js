const user = require('../models/user');
const group= require('../models/group');

module.exports.creategroup =async (req,res)=>{
    try{
        const data =req.body;
        console.log(data.groupname)

        const grouptable = await group.create({
            Groupname:data.groupname
        })
        return res.status(201).json({success:true,message:grouptable})
    }
    catch(err){
        console.log(err)
        return res.status(404).json({success:false,message:'unable to create a group'})
    }
}