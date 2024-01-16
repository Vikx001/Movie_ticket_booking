const Sequelize = require("sequelize");

const dB = new Sequelize('studio_ghibli', 'root', 'rootadmin', {
  host: "localhost",
  dialect: "mysql",
});

module.exports = dB;
