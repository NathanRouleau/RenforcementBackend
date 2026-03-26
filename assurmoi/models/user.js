const { Model, DataTypes, Sequelize } = require('sequelize')
const User = (dbInstance, DataTypes) =>{
    class User extends Model {
        // static associate(models) {
        //     this.belongsTo(models.Role, {
        //         foreignKey: 'role_id',
        //         as: 'Role'
        //     })
        // }
        clean() {
            const { password, token, refresh_token, two_step_code, ...cleandUser} = this.dataValues;
            return cleandUser
        }
    }

    User.init({
        username:{
            type: DataTypes.STRING(50),
            unique: true,
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
        role: {
            type: DataTypes.ENUM('superadmin', 'manager', 'sinister_manager', 'request_manager', 'insured'),
            defaultValue: 'insured'
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        refresh_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        two_step_code: {
            type: DataTypes.STRING,
            allowNull: true
        },
        active:  {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },{
        sequelize:dbInstance,
        modelName: 'User',
        timestamps: false
    }
    )
    return User
}

module.exports = User