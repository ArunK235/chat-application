const User = require('../models/user');
const group= require('../models/group');
const usergroup = require('../models/usergroup')

module.exports.creategroup =async (req,res)=>{
    try{
        const data =req.body
        const userId = req.user.id
        //console.log(data.groupname)
        const addCommonGroup = await group.findOrCreate({
            where: { Groupname: 'common' }   
        }).then((result) => {
            return result;
        })
        console.log(addCommonGroup)

        const grouptable = await group.create({
            Groupname:data.groupname,
            userId:userId
        })
        await req.user.addGroup(grouptable)
        return res.status(201).json({success:true,message:grouptable})
    }
    catch(err){
        console.log(err)
        return res.status(404).json({success:false,message:'unable to create a group'})
    }
}
module.exports.allgroups= async(req,res)=>{
    try{
        //console.log('entered in all groups');
        const userId = req.user.id
        const groupdata = await usergroup.findAll({
            where:{userId:userId},
            attributes:['groupId']
        }) 
        const groupIds = groupdata.map(group =>group.groupId)
        const groups = await group.findAll({
            where: { id: groupIds },
            attributes: ['id','GroupName']
        })
        res.status(200).json({message:groups})
    }
    catch(err){
        console.log(err)
    }
}

module.exports.groupcheck= async(req,res)=>{
    try{
        const groupId = req.params.id
        const userId = req.user.id
        console.log(groupId,userId)
        return res.status(201).json({success:true})
    }
    catch(err){
        console.log(err)
    }
}