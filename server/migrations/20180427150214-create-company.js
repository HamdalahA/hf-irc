module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Companies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    regDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    phoneNo: {
      type: Sequelize.BIGINT,
      unique: true
    },
    siteAddress: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    contactPerson: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Companies', {
    force: true, cascade: true
  })
};
