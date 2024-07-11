const bcrypt = require('bcrypt');
('use strict');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('ffl031202', 10);

    return queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        username: 'johndoe',
        password: hashedPassword,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
