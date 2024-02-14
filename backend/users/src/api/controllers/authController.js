const authService = require("../services/authService");

const authController = {
  async authenticateUser(req, res) {
    try {
      const { email, password } = req.body;
      const Roletoken = await authService.authenticateUser(email, password);
      const Role=t=Roletoken.Role;
      const token=Roletoken.token;
      res.status(200).json({ message: "Authentication successful", Role,token });
    } catch (error) {
      res.status(500).json({ message: "Auth Controller " + error.message });
    }
  },
};

module.exports = authController;
