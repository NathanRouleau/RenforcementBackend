const { Model } = require('sequelize');

const Dossier = (dbInstance, DataTypes) => {
    class Dossier extends Model {}
    Dossier.init({
        numero_dossier: { type: DataTypes.STRING, allowNull: false },
        sinistre_id: { type: DataTypes.INTEGER, allowNull: false },
        charge_suivi_id: DataTypes.INTEGER,
        statut_courant: { type: DataTypes.STRING, allowNull: false },
        scenario: DataTypes.STRING,
        date_expertise_planifiee: DataTypes.DATE,
        date_expertise_effective: DataTypes.DATE,
        date_retour_expertise: DataTypes.DATE,
        diagnostic: DataTypes.STRING,
        date_intervention_planifiee: DataTypes.DATE,
        date_attente_prise_en_charge: DataTypes.DATE,
        date_heure_prise_en_charge: DataTypes.DATE,
        date_heure_debut_intervention: DataTypes.DATE,
        date_fin_intervention: DataTypes.DATE,
        date_restitution_planifiee: DataTypes.DATE,
        date_restitution_effective: DataTypes.DATE,
        date_reception_facture: DataTypes.DATE,
        date_reglement: DataTypes.DATE,
        estimation_indemnisation: DataTypes.DECIMAL(10, 2),
        approbation_client: DataTypes.BOOLEAN,
        date_previsionnelle_pec: DataTypes.DATE,
        date_pec_effective: DataTypes.DATE,
        date_indemnisation: DataTypes.DATE,
        facture_reglee_assurance_tiers: DataTypes.BOOLEAN,
        est_clos: DataTypes.BOOLEAN
    }, {
        sequelize: dbInstance,
        modelName: 'Dossier',
        tableName: 'Dossier',
        timestamps: true
    });
    return Dossier;
}
module.exports = Dossier;