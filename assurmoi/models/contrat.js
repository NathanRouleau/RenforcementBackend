const { Model } = require('sequelize');

const Contrat = (dbInstance, DataTypes) => {
    class Contrat extends Model {}
    Contrat.init({
        numero_contrat: { type: DataTypes.STRING, allowNull: false },
        assure_id: { type: DataTypes.INTEGER, allowNull: false },
        type_couverture: DataTypes.STRING,
        franchise: DataTypes.DECIMAL(10, 2),
        statut: DataTypes.STRING,
        date_souscription: DataTypes.DATE
    }, {
        sequelize: dbInstance,
        modelName: 'Contrat',
        tableName: 'Contrat',
        timestamps: true
    });
    return Contrat;
}
module.exports = Contrat;