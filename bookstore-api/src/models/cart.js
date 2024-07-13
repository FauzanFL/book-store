'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.CartItem, {
        sourceKey: 'id',
        foreignKey: 'cart_id',
        as: 'items',
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
        as: 'user',
      });
    }
  }
  Cart.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        validate: {
          notNull: {
            args: true,
            msg: 'User id is requiered',
          },
          isInt: {
            args: true,
            msg: 'User id must be an integer',
          },
        },
        isExist(val) {
          return sequelize.models.User.findByPk(value).then((user) => {
            if (!user) {
              throw new Error('User does not exist');
            }
          });
        },
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
