const express = require('express');
const router=express.Router();

const messagecontroller = require('../controllers/messages');
const authenticatemsg = require('../middlewares/auth');

router.post('/tostore/:id',authenticatemsg.Authenticate, messagecontroller.addMessage);

router.get('/toget/:id',authenticatemsg.Authenticate,messagecontroller.getMessages);

router.get('/localmsg',messagecontroller.getAllMessages);

module.exports =router