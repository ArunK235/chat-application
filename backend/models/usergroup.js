const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const userGroupData = sequelize.define('usergroup',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})
module.exports = userGroupData