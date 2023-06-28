module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: 'Admin User',
        password: 'adminpassword',
        role: 'admin',
        email: 'admin@email.com',
        birthday: new Date('2077-09-07'),
        country: 'Brazil',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Normal User',
        password: 'userpassword',
        role: 'user',
        email: 'normal@email.com',
        birthday: new Date('1800-07-09'),
        country: 'China',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
