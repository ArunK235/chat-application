const express = require('express');

let cors = require('cors')
const bodyParser= require('body-parser')

const user=require('./backend/models/user');
const messages = require('./backend/models/message')

const db=require('./backend/util/database');

const userR =require('./backend/routes/userroutes');
const messagesR = require('./backend/routes/messageroutes');

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/user',userR);
app.use('/message',messagesR);


user.hasMany(messages)
messages.belongsTo(user)

db.sync({alter:true})
.then().catch((err)=>{
    console.log(err);
})
app.listen(3000);