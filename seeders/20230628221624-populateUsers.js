module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        name: 'Admin User',
        password: 'adminpassword',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Normal User',
        password: 'userpassword',
        role: 'user',
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
