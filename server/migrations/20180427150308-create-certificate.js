module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Certificates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    companyId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
        as: 'companyId'
      }
    },
    companyName: {
      type: Sequelize.STRING
    },
    refNo: {
      type: Sequelize.STRING,
      unique: true
    },
    imageUrl: {
      type: Sequelize.TEXT
    },
    expiryDate: {
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
  }),
  down: queryInterface => queryInterface.dropTable('Certificates', {
    force: true, cascade: true
  })
};
