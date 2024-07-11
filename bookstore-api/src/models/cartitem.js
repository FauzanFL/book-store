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
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Cart',
          key: 'id',
        },
        validate: {
          notNull: {
            args: true,
            msg: 'Cart id is requiered',
          },
          isInt: {
            args: true,
            msg: 'Cart id must be an integer',
          },
        },
        isExist(val) {
          return sequelize.models.Cart.findByPk(value).then((cart) => {
            if (!cart) {
              throw new Error('cart does not exist');
            }
          });
        },
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Book',
          key: 'id',
        },
        validate: {
          notNull: {
            args: true,
            msg: 'Book id is requiered',
          },
          isInt: {
            args: true,
            msg: 'Book id must be an integer',
          },
        },
        isExist(val) {
          return sequelize.models.Book.findByPk(value).then((book) => {
            if (!book) {
              throw new Error('Book does not exist');
            }
          });
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            args: true,
            msg: 'Quantity is required',
          },
          isInt: {
            args: true,
            msg: 'Quantity must be an integer',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'CartItem',
    }
  );
  return CartItem;
};
