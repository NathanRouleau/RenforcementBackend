'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Role', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        label: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      }, { transaction })
      await queryInterface.addColumn('Users', 'role_id', {
        type: Sequelize.INTEGER,
        references : {
          model: 'Role',
          key: 'id'
        }
      }, { transaction });
      transaction.commit();
    } catch (err) {
      transaction.rollback();
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Users', 'role_id', { transaction })
      await queryInterface.dropTable('Role', { transaction })
      transaction.commit();
    } catch (err) {
      transaction.rollback();
    }
  }
};
