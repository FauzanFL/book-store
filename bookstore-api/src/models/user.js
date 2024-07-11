'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Cart, {
        sourceKey: 'id',
        foreignKey: 'user_id',
      });
      this.hasMany(models.Transaction, {
        sourceKey: 'id',
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
