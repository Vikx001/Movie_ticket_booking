const HttpStatus = require("../../utils/HttpStatus");
const customerService = require("../services/customerService");
const customerValidationSchema = require("../validations/customerSchema");
const service = new customerService();
const Joi = require("joi");

const CustomerController = {
  /**
   * This function validate the given request and trigger the Enrollment Service
   * @param {*} req
   * @param {*} res
   * @returns JsonResponse
   */
  async createCustomer(req, res) {
    // Validate the request body first
    const { error } = customerValidationSchema.validate(req.body);
    const responseData = {
      data: [],
      message: "",
    };

    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        ...responseData,
        message: error.details[0].message,
      });
    }

    try {
      // Prepare user data, defaulting role to "customer" if not provided or invalid
      const role =
        req.body.role && req.body.role.trim() !== ""
          ? req.body.role
          : "customer";

      const userData = {
        email: req.body.email,
        password: req.body.password,
        role: role,
      };

      // Create user and get userId
      const userServiceResponse = await service.createUser(userData);
      if (409 != userServiceResponse) {
        // Prepare customer data
        const userId = userServiceResponse.data.id;
        const customerData = { ...req.body, user_id: userId };

        // Create customer
        const customer = await service.createCustomer(customerData);

        // Respond with 201 Created and the created customer object

        return res.status(HttpStatus.CREATED).json({
          ...responseData,
          message: "Customer has been created successfully.",
          data: customer,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          ...responseData,
          message: "This email address already exists!",
          data: req.body,
        });
      }
    } catch (error) {
      // Respond with 500 Internal Server Error and the error message
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        ...responseData,
        message: `Error: ${error.message}`,
      });
    }
  },
  async viewCustomer(req, res) {
    try {
      const userResponse = await service.viewUsers();
      if (409 != userResponse) {
        const cutomerResponse = await service.viewCustomer();
        const user = JSON.parse(JSON.stringify(userResponse.data));
        const cutomer = JSON.parse(JSON.stringify(cutomerResponse));
        const userDetail = cutomer.map((cutomer) => {
          const customerDetail = user.find((u) => u.id === cutomer.user_id);
          if (customerDetail) {
            const { role, email_id } = customerDetail; // Specify specific columns here
            return {
              role,
              email_id,
              ...cutomer,
            };
          }
        });
        return res.status(HttpStatus.OK).json({
          message: "User details have been fetched successfully.",
          data: userDetail,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "User is Empty!",
        });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Error in User", error: error.message });
    }
  },
  async viewCustomerById(req, res) {
    try {
      const userId = req.params.id;
      const userResponse = await service.viewUsersById(userId);
      if (409 != userResponse) {
        const cutomerResponse = await service.viewCustomerById(userId);
        const user = JSON.parse(JSON.stringify(userResponse.data));
        const cutomer = JSON.parse(JSON.stringify(cutomerResponse));
        const userDetail = cutomer.map((cutomer) => {
          const customerDetail = user.find((u) => u.id === cutomer.user_id);
          if (customerDetail) {
            const { role, email_id } = customerDetail; // Specify specific columns here
            return {
              role,
              email_id,
              ...cutomer,
            };
          }
        });
        return res.status(HttpStatus.OK).json({
          message: "User details has been fetched successfully.",
          data: userDetail,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "User is Empty!",
        });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Error in User", error: error.message });
    }
  },
  async deleteCustomer(req, res) {
    const userId = req.params.id;
    try {
      const userResponse = await service.deleteUser(userId);
      if (409 != userResponse) {
        const cutomerResponse = await service.deleteCustomer(userId);
        return res
          .status(HttpStatus.OK)
          .send({
            message: `User with user ID : ${userId} deleted successfully`,
          });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "User is Empty!",
        });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: "Error in User", error: error.message });
    }
  },
  async updateCustomer(req, res) {
    try {
      const userId = req.params.id;
      const customer = await service.updateCustomer(req.body, userId);
      if (customer == 409) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "User not exists!",
        });
      } else {
        res.status(HttpStatus.OK).send({
          message: `customer with user ID:${userId} updated successfully`,
          Data: req.body,
        });
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  },
};

module.exports = CustomerController;
