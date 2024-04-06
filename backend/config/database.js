const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('SQLD', 'COMP214_W24_zo_53', 'BabeKimsreng17', {
    host: '199.212.26.208',
    dialect: 'oracle'
});
module.exports = sequelize;