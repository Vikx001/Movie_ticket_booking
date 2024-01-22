const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
const { use } = require("../routes/userRoutes");
const bcrypt= require("bcrypt");
const secretKey = "1234567890";

const authService = {
  async authenticateUser(username, password) {
    const user = await User.findOne({
      where: {
      Username: username,
      status:1
            }
    });
    if (user)
    {
     match = await bcrypt.compare(password, user.password);
     if (!match) {
      throw new Error("Invalid credentials"); }
    }
    if (!user)
    {
      throw new Error("User not found");
    }

    const token = jwt.sign({ userId: user.UserID }, secretKey, {
      expiresIn: "1h",
    });
    return token;
  },
};

module.exports = authService;
