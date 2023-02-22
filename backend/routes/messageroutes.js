const express = require('express');
const router=express.Router();

const messagecontroller = require('../controllers/messages');
const authenticatemsg = require('../middlewares/auth');

router.post('/tostore',authenticatemsg.Authenticate, messagecontroller.addMessage);

module.exports =router