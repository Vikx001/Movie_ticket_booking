const Sequelize = require("sequelize");

const dB = new Sequelize('studioghibli', 'root', 'rootadmin', {
  host: "localhost",
  dialect: "mysql",
});

module.exports = dB;
