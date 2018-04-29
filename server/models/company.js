export default (sequelize, DataTypes) => {
  const company = sequelize.define('Company', {
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    regDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phoneNo: {
      type: DataTypes.INTEGER,
      unique: true
    },
    siteAddress: {
      type: DataTypes.TEXT
    }
  });
  company.associate = function(models) {
    company.hasMany(models.Product, {
      foreignKey: 'companyId',
    });
    company.hasOne(models.Certificate, {
      foreignKey: 'companyId',
    });
    company.hasOne(models.Contact, {
      foreignKey: 'companyId',
    });
  };
  return company;
};
