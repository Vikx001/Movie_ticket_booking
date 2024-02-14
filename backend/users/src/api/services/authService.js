const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { use } = require("../routes/userRoutes");
const bcrypt = require("bcrypt");
const secretKey = "1234567890";
const Op = require("sequelize");

const authService = {
  async authenticateUser(email, password) {
    const user = await User.findOne({
      where: {
        email_id: email,
        status: 1,
      },
    });

    if (user) {
      match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new Error("Invalid credentials");
      } else {
        const token = jwt.sign({ id: user.id }, secretKey, {
          expiresIn: "1h",
        });
        const Role=user.role;
        return {token,Role};
      }
    } else {
      throw new Error("User not found");
    }
  },
};

module.exports = authService;
