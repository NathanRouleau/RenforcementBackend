const { Model, DataTypes, Sequelize } = require('sequelize')
const User = (dbInstance, DataTypes) =>{
    class User extends Model {}

    User.init({
        username:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname:{
            type: DataTypes.STRING(50),
            allowNull: true
        },
        lastname:{
            type: DataTypes.STRING(50),
            allowNull: true
        },
        email: DataTypes.STRING,
        // role: {
        //     type: DataTypes.ENUM('superadmin', 'user'),
        //     allowNull: false,
        //     defaultValue: 'user'
        // }
    },{
        sequelize:dbInstance,
        modelName: 'User',
        timestamps: false
    }
    )
    return User
}

module.exports = User