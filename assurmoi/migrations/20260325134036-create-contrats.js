'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Contrat', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero_contrat: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      assure_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Assure', key: 'id' }
      },
      type_couverture: { type: Sequelize.STRING },
      franchise: { type: Sequelize.DECIMAL(10, 2) },
      statut: { type: Sequelize.STRING },
      date_souscription: { type: Sequelize.DATE },
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
    await queryInterface.dropTable('Contrat');
  }
};