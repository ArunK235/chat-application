const express = require('express');

let cors = require('cors')
const bodyParser= require('body-parser')

const user=require('./backend/models/user');
const messages = require('./backend/models/message')
const group = require('./backend/models/group');
const userGroupData = require('./backend/models/usergroup')

const db=require('./backend/util/database');

const userR =require('./backend/routes/userroutes');
const messagesR = require('./backend/routes/messageroutes');
const groupR =require('./backend/routes/group')

const app = express();

app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/user',userR);
app.use('/message',messagesR);
app.use('/group',groupR);

user.hasMany(messages)
messages.belongsTo(user)

group.hasMany(messages)
messages.belongsTo(group)

user.belongsToMany(group,{through:userGroupData})
group.belongsToMany(user,{through:userGroupData})

db.sync({})
.then().catch((err)=>{
    console.log(err);
})
app.listen(3000);