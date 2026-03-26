const { Model } = require('sequelize');

const ActionLog = (dbInstance, DataTypes) => {
    class ActionLog extends Model {}
    ActionLog.init({
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        entite_concernee: { type: DataTypes.STRING, allowNull: false },
        entite_id: { type: DataTypes.INTEGER, allowNull: false },
        action: { type: DataTypes.STRING, allowNull: false },
        details: DataTypes.TEXT
    }, {
        sequelize: dbInstance,
        modelName: 'ActionLog',
        tableName: 'ActionLog',
        timestamps: true
    });
    return ActionLog;
}
module.exports = ActionLog;