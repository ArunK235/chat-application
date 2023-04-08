const express = require('express');
const router=express.Router();

const groupcontroller  = require('../controllers/group')

const authenticatemsg = require('../middlewares/auth');

router.post('/tocreate',authenticatemsg.Authenticate, groupcontroller.creategroup)
router.get('/allgroups',authenticatemsg.Authenticate, groupcontroller.allgroups)
router.get('/groupid/:id',authenticatemsg.Authenticate, groupcontroller.groupcheck)
router.get('/toadduser',authenticatemsg.Authenticate, groupcontroller.addusertogroup)

router.get('/togetAllusers',groupcontroller.allMembersInGroup)

router.put('/makeAdmin',authenticatemsg.Authenticate,groupcontroller.makeAdmin)

router.delete('/deleteUser',authenticatemsg.Authenticate,groupcontroller.deleteUser)
module.exports = router