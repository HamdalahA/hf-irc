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
    phoneNo: {
      type: DataTypes.BIGINT,
      unique: true
    },
    siteAddress: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contactPerson: {
      type: DataTypes.STRING
    }
  });
  company.associate = (models) => {
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
