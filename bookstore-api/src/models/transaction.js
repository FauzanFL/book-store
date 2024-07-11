'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      });
    }
  }
  Transaction.init(
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
      total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Total is required',
          },
          isInt: {
            args: true,
            msg: 'Total must be an integer',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Status is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  return Transaction;
};
