const { Model } = require('sequelize');

const Sinistre = (dbInstance, DataTypes) => {
    class Sinistre extends Model {}
    Sinistre.init({
        assure_id: { type: DataTypes.INTEGER, allowNull: false },
        contrat_id: { type: DataTypes.INTEGER, allowNull: false },
        charge_clientele_id: DataTypes.INTEGER,
        gestionnaire_validation_id: DataTypes.INTEGER,
        immatriculation_vehicule: { type: DataTypes.STRING, allowNull: false },
        nom_prenom_conducteur: { type: DataTypes.STRING, allowNull: false },
        is_conducteur_assure: { type: DataTypes.BOOLEAN, allowNull: false },
        date_heure_appel: DataTypes.DATE,
        date_heure_sinistre: { type: DataTypes.DATE, allowNull: false },
        contexte: { type: DataTypes.TEXT, allowNull: false },
        responsabilite_engagee: { type: DataTypes.BOOLEAN, allowNull: false },
        pourcentage_responsabilite: DataTypes.INTEGER,
        statut: DataTypes.STRING
    }, {
        sequelize: dbInstance,
        modelName: 'Sinistre',
        tableName: 'Sinistre',
        timestamps: true
    });
    return Sinistre;
}
module.exports = Sinistre;