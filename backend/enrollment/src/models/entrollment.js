const Sequelize = require("sequelize");
const dB = require("../config/database");

const User = dB.define("User", {
  //Define attributes

  Username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  EmailID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  PhoneNo: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
