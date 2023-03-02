const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const groupdata = sequelize.define('group',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    Groupname:{
        type:Sequelize.STRING,
        allowNull:false,
        
    
    }
})
module.exports=groupdata