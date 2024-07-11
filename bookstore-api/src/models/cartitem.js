'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Book, {
        foreignKey: 'book_id',
        targetKey: 'id',
      });
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cart_id',
        targetKey: 'id',
      });
    }
  }
  CartItem.init(
    {
      cart_id: DataTypes.INTEGER,
      book_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'CartItem',
    }
  );
  return CartItem;
};
