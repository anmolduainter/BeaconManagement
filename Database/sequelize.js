const Sequelize=require('sequelize');

const sequelize=new Sequelize(
    {
        host:'localhost',
        username:'someuser',
        database:'Beacon',
        password:'somepass',
        dialect:'mysql',
        define:{
            underscored:true
        }

    }
);

let db={};

db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.login=require('../Model/user')(sequelize,Sequelize);
sequelize.sync().then(function () {
    console.log("DataBase is ready");
});
module.exports=db;