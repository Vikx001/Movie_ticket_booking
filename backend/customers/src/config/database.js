const Sequelize = require("sequelize");

const dB = new Sequelize("workbench_studio_ghibli", "root", "12345678", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = dB;
