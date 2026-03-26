const { Model, DataTypes } = require('sequelize');
const { dbInstance } = require('.');

const Role = (dbInstance, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            this.hasMany(models.User, {
                foreignKey: 'role_id',
                as: ' Users'
            })
        }
    }

    Role.init({
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize: dbInstance,
        modelName: 'Role',
        tableName: 'Role',
        timestamps: false
    })

    return Role;
}

module.exports = Role;