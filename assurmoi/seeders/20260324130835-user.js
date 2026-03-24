'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        username: 'nathan',
        password: 'test',
        firstname: 'Nathan',
        lastname: 'ROULEAU',
        email: 'nathan7.rouleau@gmail.com'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', { username: 'nathan' })
  }
};
