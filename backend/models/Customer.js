const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Customer extends Model {}

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Add other customer fields here
}, {
  sequelize,
  modelName: 'Customer',
});

module.exports = Customer;
