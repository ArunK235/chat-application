const express = require('express');

let cors = require('cors')
const bodyParser= require('body-parser')

const user=require('./backend/models/user');

const db=require('./backend/util/database');

const userR =require('./backend/routes/userroutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/user',userR);

db.sync({})
.then().catch((err)=>{
    console.log(err);
})
app.listen(3000);