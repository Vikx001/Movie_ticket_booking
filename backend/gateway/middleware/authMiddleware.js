const axios = require("axios");

// Correctly define the async function
const authMiddleware = async (req, res, next) => {
  try {
    next();
    // // Check if the authorization header exists
    // if (!req.headers.authorization) {
    //   throw new Error("No authorization header");
    // }

    // const token = req.headers.authorization.split(" ")[1];
    // if (!token) {
    //   throw new Error("Bearer token not provided");
    // }

    // const customer_response = await axios.get(
    //   `${process.env.USER_SERVICE_END_POINT}:${process.env.USER_SERVICE_PORT}/verify/token`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    // // It's more conventional to check for successful response directly
    // if (customer_response && customer_response.data) {
    //   next();
    // } else {
    //   // If no data is returned, authentication failed
    //   throw new Error("No customer data returned");
    // }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Authentication middleware error:", error.message);
    return res.status(401).send({ message: "Authentication Failed" });
  }
};

module.exports = authMiddleware;
