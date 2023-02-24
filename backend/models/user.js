const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull : false,
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
    },
    number:{
        type:Sequelize.CHAR(10),
        unique:true

    },
    password:Sequelize.STRING,
});

module.exports=User