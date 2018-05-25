export default (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reset_password_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });
  return user;
};
