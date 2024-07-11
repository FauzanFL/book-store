'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Books', [
      {
        image:
          'https://www.pluggedin.com/wp-content/uploads/2020/01/hobbit-cover.jpg',
        title: 'The Hobbit',
        description:
          "Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely travelling further than the pantry of his hobbit-hole in Bag End. But his contentment is disturbed when the wizard, Gandalf, and a company of 13 dwarves arrive on his doorstep one day to whisk him away on an unexpected journey 'there and back again'.",
        author: 'J.R.R. Tolkien',
        stock: 6,
        price: 435000,
      },
      {
        image:
          'https://static-ppimages.freetls.fastly.net/product/9780008537722.jpg?canvas=363,600&fit=bounds&height=600&mode=max&width=363&404=default.jpg',
        title: 'The Lord of the Rings',
        description:
          'A beautiful illustrated boxed set collecting the two most popular Tolkien hardbacks -- the Centenary edition of The Lord of the Rings and the 60th Anniversary edition of The Hobbit, both illustrated by Alan Lee. Since they were first published, The Hobbit and The Lord of the Rings have been two books people have treasured. Steeped in unrivalled magic and otherworldliness, these works of sweeping fantasy have touched the hearts of young and old alike. Between them, nearly 100 million copies have been sold around the world. And no editions have proved more popular than the two that were illustrated by award-winning artist, Alan Lee -- the Centenary edition of The Lord of the Rings and the 60th Anniversary edition of The Hobbit.',
        author: 'J.R.R Tolkien',
        stock: 5,
        price: 560000,
      },
      {
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSao96a08eb5L2Vy5ipQ3Rze0tyWTCR2jRPUg&s',
        title: 'The Chronicles of Narnia',
        description:
          'The Chronicles of Narnia is a series of seven fantasy novels by C. S. Lewis. It is considered a classic of childrens literature and is the authors best-known work, having sold over 100 million copies in 47 languages. Written by Lewis, illustrated by Pauline Baynes, and originally published in London between 1950 and 1956, The Chronicles of Narnia has been adapted several times, complete or in part, for radio, television, the stage, and film.',
        author: 'C.S.S. Lewis',
        stock: 7,
        price: 450000,
      },
      {
        image:
          'https://m.media-amazon.com/images/I/91L90Y-hpxL._AC_UF1000,1000_QL80_.jpg',
        title: 'A Game of Thrones (A Song of Ice and Fire, #1)',
        description:
          'Long ago, in a time forgotten, a preternatural event threw the seasons out of balance. In a land where summers can last decades and winters a lifetime, trouble is brewing. The cold is returning, and in the frozen wastes to the north of Winterfell, sinister forces are massing beyond the kingdom’s protective Wall. To the south, the king’s powers are failing—his most trusted adviser dead under mysterious circumstances and his enemies emerging from the shadows of the throne. At the center of the conflict lie the Starks of Winterfell, a family as harsh and unyielding as the frozen land they were born to. Now Lord Eddard Stark is reluctantly summoned to serve as the king’s new Hand, an appointment that threatens to sunder not only his family but the kingdom itself.',
        author: 'George R.R. Martin',
        stock: 5,
        price: 500000,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Books', null, {});
  },
};
