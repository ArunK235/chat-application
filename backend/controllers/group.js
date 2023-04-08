const User = require('../models/user');
const group= require('../models/group');
const usergroup = require('../models/usergroup')

module.exports.creategroup =async (req,res)=>{
    try{
        const data =req.body
        const userId = req.user.id
        //console.log(data.groupname)
        const addCommonGroup = await group.findOrCreate({
            where: { Groupname: 'common',isAdmin:false }   
        }).then((result) => {
            return result;
        })
        console.log(addCommonGroup)

        const grouptable = await group.create({
            Groupname:data.groupname,
            userId:userId,
            isAdmin:true
        })
        
        const groupId = grouptable.id;
        let isAdmin = grouptable.isAdmin
        if(isAdmin === null){
            isAdmin=false
        }
        await usergroup.create({
            userId:userId,
            groupId:groupId,
            isAdmin:isAdmin
        })
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

exports.allMembersInGroup = async (req, res) => {
    try {
        const groupId = req.query.groupId
        console.log(groupId)
        const groupMembersId = await usergroup.findAll({ where: { groupId: groupId }, attributes: ['userId', 'isAdmin'] })

        const members = await Promise.all(groupMembersId.map(async data => {
            const membersName = await User.findAll({ where: { id: data.userId }, attributes: ['name'] })
            for (let user of membersName) {
                return { userId: data.userId, isAdmin: data.isAdmin, name: user.name }
            }
        }))
        return res.status(200).json({ success: true, members: members })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'unable to retrieve group members' })
    }
}


module.exports.groupcheck= async(req,res)=>{
    try{
        const groupId = req.params.id
        const userId = req.user.id
        //console.log(groupId,userId)
        return res.status(201).json({success:true})
    }
    catch(err){
        console.log(err)
    }
}
module.exports.addusertogroup = async (req,res)=>{
    try{
        const groupId = req.query.groupId
        const isAdmin= req.query.admin
        const userId = req.user.id
        const email = req.user.userEmail
        console.log(groupId,userId,email)
        if(email){
            console.log('entered in email block')
            const userId1 = await User.findOne({where:{email:email},attributes:['id']})
            console.log(userId1.id, 'user in inside ')
            const id = userId1.id
            const result = await usercheck(groupId,id,isAdmin)
            if(result =='success'){
                return res.status(201).json({success:true, message:'user created'})
            }
            else{
                return res.status(200).json({success:true,message:'user exists'})
            }
        }
        console.log('not entered in email block')
        const result = await usercheck(groupId,userId,isAdmin)
        if(result =='success'){
            return res.status(201).json({success:true, message:'user created'})
        }
        else{
            return res.status(200).json({success:true,message:'user exists'})
        }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:'failed at userCheck function'})
    }
}

async function usercheck(groupId,userId,isAdmin){
    try{
        console.log('entered user in check')
        const useringroupornot = await usergroup.findOne({where:{ groupId:groupId,userId:userId}})
        if(!useringroupornot){
            await usergroup.create({
                userId:userId,
                groupId:groupId,
                isAdmin:isAdmin
            })
            return success
        }
        return false
    }
    catch(err){
        console.log(err)
        return false;
    }
    
}
exports.makeAdmin = async(req,res)=>{
    try{
        const tomakeadminId= req.query.userId
        const userId =req.user.id
        const groupId = req.query.groupId
        console.log(tomakeadminId,userId)
        const userAdminOrNot = await usergroup.findOne({where:{groupId:groupId,userId:userId},attributes:['isAdmin']})
        console.log(userAdminOrNot.isAdmin)
        if(userAdminOrNot.isAdmin === false){
            return res.status(401).json({success:true,message:'user is not an admin'})
        }
        await userGroup.update({isAdmin:true},{
            where: { groupId:groupId,userId:toMakeAdminId },
          })
          return res.status(202).json({success:true,message:'updated successfully'})
    }
    catch(err){
        console.log(err)
    }
}
exports.deleteUser = async(req,res)=>{
    try{
        const todeleteUserId = req.query.userId
        const groupId = req.query.groupId
        const userId = req.user.id
        console.log(todeleteUserId,userId)
        const userAdminOrNot = await usergroup.findOne({where:{groupId:groupId,userId:userId},attributes:['isAdmin']})
        console.log(userAdminOrNot.isAdmin)
        if(userAdminOrNot.isAdmin === false){
            return res.status(401).json({success:true,message:'user is not an admin'})
        }
        await userGroup.destroy({
            where: { groupId:groupId,userId:todeleteUserId },
          })
          return res.status(202).json({success:true,message:'updated successfully'})
    }
    catch(err){
        console.log(err)
    }
}