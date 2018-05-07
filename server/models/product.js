export default (sequelize, DataTypes) => {
  const product = sequelize.define('Product', {
    category: {
      type: DataTypes.STRING
    },
    companyId: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  });
  product.associate = (models) => {
    product.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE'
    });
  };
  return product;
};
