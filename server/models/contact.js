export default (sequelize, DataTypes) => {
  const contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: { isEmail : true }
    },
    phoneNo: {
      type: DataTypes.INTEGER
    },
    companyId: {
      type: DataTypes.INTEGER
    }
  });
  contact.associate = (models) => {
    contact.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE'
    })
  };
  return contact;
};
