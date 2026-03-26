'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Dossier', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_dossier: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      sinistre_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'Sinistre', key: 'id' }
      },
      charge_suivi_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      statut_courant: { type: Sequelize.STRING, allowNull: false },
      scenario: { type: Sequelize.STRING },
      
      // Dates workflow
      date_expertise_planifiee: { type: Sequelize.DATE },
      date_expertise_effective: { type: Sequelize.DATE },
      date_retour_expertise: { type: Sequelize.DATE },
      diagnostic: { type: Sequelize.STRING },
      date_intervention_planifiee: { type: Sequelize.DATE },
      date_attente_prise_en_charge: { type: Sequelize.DATE },
      date_heure_prise_en_charge: { type: Sequelize.DATE },
      date_heure_debut_intervention: { type: Sequelize.DATE },
      date_fin_intervention: { type: Sequelize.DATE },
      date_restitution_planifiee: { type: Sequelize.DATE },
      date_restitution_effective: { type: Sequelize.DATE },
      date_reception_facture: { type: Sequelize.DATE },
      date_reglement: { type: Sequelize.DATE },
      estimation_indemnisation: { type: Sequelize.DECIMAL(10, 2) },
      approbation_client: { type: Sequelize.BOOLEAN },
      date_previsionnelle_pec: { type: Sequelize.DATE },
      date_pec_effective: { type: Sequelize.DATE },
      date_indemnisation: { type: Sequelize.DATE },
      facture_reglee_assurance_tiers: { type: Sequelize.BOOLEAN, defaultValue: false },
      est_clos: { type: Sequelize.BOOLEAN, defaultValue: false },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Dossier');
  }
};