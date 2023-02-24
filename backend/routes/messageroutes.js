const express = require('express');
const router=express.Router();

const messagecontroller = require('../controllers/messages');
const authenticatemsg = require('../middlewares/auth');

router.post('/tostore',authenticatemsg.Authenticate, messagecontroller.addMessage);

router.get('/toget',messagecontroller.getMessages);

module.exports =router