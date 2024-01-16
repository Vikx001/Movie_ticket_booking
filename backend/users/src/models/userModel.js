const Sequelize = require("sequelize");
const dB = require("../config/database");

const User = dB.define("User", {
  //Define attributes
  userid :{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    validate:{
        notEmpty: true,
        }
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    /*phoneno:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [9, 20]
        }
    },
    emailid:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },*/
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [6, 255]
        }
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 50]
        }
    },
    status:{
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    createdAt:{
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    updatedAt:{
        type: Sequelize.DATE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }},{
    freezeTableName: true
});

module.exports = User;
