const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { use } = require("../routes/userRoutes");

const secretKey = "1234567890";

const authService = {
  async authenticateUser(username, password) {
    const user = await User.findOne({
      where: { Username: username, Password: password },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.UserID }, secretKey, {
      expiresIn: "1h",
    });
    return token;
  },
};

module.exports = authService;
