export default (sequelize, DataTypes) => {
  const certificate = sequelize.define('Certificate', {
    companyId: {
      type: DataTypes.INTEGER
    },
    refNo: {
      type: DataTypes.INTEGER,
      unique: true
    },
    imageUrl: {
      type: DataTypes.TEXT
    },
    expiryDate: {
      type: DataTypes.DATE
    },
  });
  certificate.associate = (models) => {
    certificate.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE'
    });
  };
  return certificate;
};
