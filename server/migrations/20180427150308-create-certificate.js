module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Certificates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER
      },
      refNo: {
        type: Sequelize.INTEGER,
        unique: true
      },
      imageUrl: {
        type: Sequelize.TEXT
      },
      expiry_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Certificates', {
      force: true, cascade: true
    });
  }
};
