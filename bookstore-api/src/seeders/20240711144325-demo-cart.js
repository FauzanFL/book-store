'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Carts', [
      {
        user_id: Sequelize.literal(
          '(SELECT id FROM Users WHERE username = "johndoe")'
        ),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Carts', null, {});
  },
};
