module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    category: {
      type: Sequelize.STRING
    },
    companyId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
        as: 'companyId'
      }
    },
    name: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Products', {
    force: true, cascade: true
  })
};
