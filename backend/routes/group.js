const express = require('express');
const router=express.Router();

const groupcontroller  = require('../controllers/group')
router.post('/tocreate',groupcontroller.creategroup)

module.exports = router