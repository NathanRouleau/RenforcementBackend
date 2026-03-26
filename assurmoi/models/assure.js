const { Model } = require('sequelize');

const Assure = (dbInstance, DataTypes) => {
    class Assure extends Model {}
    Assure.init({
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        numero_client: { type: DataTypes.STRING, allowNull: false },
        adresse: DataTypes.TEXT,
        telephone: DataTypes.STRING
    }, {
        sequelize: dbInstance,
        modelName: 'Assure',
        tableName: 'Assure',
        timestamps: true
    });
    return Assure;
}
module.exports = Assure;