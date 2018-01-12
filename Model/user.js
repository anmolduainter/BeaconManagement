module.exports = (sequelize,Datatypes)=>{
    const User=sequelize.define('GoogleUsers',{
        id:{
            type:Datatypes.DataTypes.BIGINT,
            primaryKey:true,
            autoIncrement:true,
        },
        authtoken:{
            type:Datatypes.DataTypes.STRING,
        },
        email:{
            type:DataTypes.DataTypes.STRING,
            isUnique :true,
            allowNull:false,
        }
    },{
        underscored:true
    });

    return User;

} ;