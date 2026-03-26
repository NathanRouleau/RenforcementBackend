'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Document', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sinistre_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Sinistre', key: 'id' }
      },
      dossier_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Dossier', key: 'id' }
      },
      type_document: { type: Sequelize.STRING, allowNull: false },
      chemin_fichier: { type: Sequelize.STRING, allowNull: false },
      est_valide: { type: Sequelize.BOOLEAN },
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
    await queryInterface.dropTable('Document');
  }
};