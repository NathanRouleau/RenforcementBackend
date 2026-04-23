'use strict';
const bcrypt = require('bcrypt')
require('dotenv').config()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedpassword = await bcrypt.hash('MotDeP@ss123', parseInt(process.env.BCRYPT_SALT))
    await queryInterface.bulkInsert('user', [
      {
        username: 'nathan',
        password: hashedpassword,
        firstname: 'Nathan',
        lastname: 'ROULEAU',
        email: 'nathan7.rouleau@gmail.com',
        role: 'superadmin'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'nathan' })
  }
};