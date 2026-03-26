'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Sinistre', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      assure_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Assure', key: 'id' }
      },
      contrat_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Contrat', key: 'id' }
      },
      charge_clientele_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      gestionnaire_validation_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      immatriculation_vehicule: { type: Sequelize.STRING, allowNull: false },
      nom_prenom_conducteur: { type: Sequelize.STRING, allowNull: false },
      is_conducteur_assure: { type: Sequelize.BOOLEAN, allowNull: false },
      date_heure_appel: { type: Sequelize.DATE },
      date_heure_sinistre: { type: Sequelize.DATE, allowNull: false },
      contexte: { type: Sequelize.TEXT, allowNull: false },
      responsabilite_engagee: { type: Sequelize.BOOLEAN, allowNull: false },
      pourcentage_responsabilite: { type: Sequelize.INTEGER },
      statut: { type: Sequelize.STRING },
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
    await queryInterface.dropTable('Sinistre');
  }
};