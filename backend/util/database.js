const Sequelize= require('sequelize');
const sequelize= new Sequelize('chat-app','root','landaarun',{
    dialect : 'mysql',
    host: 'localhost'
});
module.exports= sequelize;