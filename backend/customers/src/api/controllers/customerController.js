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
      const customer = await service.viewCustomer();
      res.status(201).send({
        message: "customer has been fetched successfully",
        data: customer,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async deleteCustomer(req, res) {
    try {
      const userId = req.params.id;
      const customer = await service.deleteCustomer(userId);
      res
        .status(200)
        .send({ message: `customer ${customer} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  async updateCustomer(req, res) {
    try {
      const userId = req.params.id;
      const customer = await service.updateCustomer(req.body, userId);
      res.status(200).send({
        message: `customer ${customer} update successfully`,
        Data: req.body,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = CustomerController;
