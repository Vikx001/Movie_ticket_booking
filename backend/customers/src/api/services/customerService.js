const Customer = require("../../models/customerModel");
const Joi = require("joi");
const axios = require("axios");
const fs = require("fs/promises");
class CustomerService {
  async createCustomer(data) {
    try {
      const customer = await Customer.create(this.extractCustomerFields(data));
      return customer;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async viewCustomer() {
    try{
      const customerDetails = await Customer.findAll({
      attributes: [
        "id",
        "user_id",
        "full_name",
        "phone_no",
        "area_of_interests",
        "status",
        "created_at",
        "updated_at",
      ],
    });
    return customerDetails;
  }catch (error) {
    throw new Error(error.message);
  }
  }
  async viewCustomerById(userId) {
    try{
      const customerDetails = await Customer.findAll({
      attributes: [
        "id",
        "user_id",
        "full_name",
        "phone_no",
        "area_of_interests",
        "status",
        "created_at",
        "updated_at",
      ],
      where: {
          user_id: userId,
        },
    });
    return customerDetails;
  }catch (error) {
    throw new Error(error.message);
  }
  }
  // Extracts course fields from data
  extractCustomerFields(data) {
    return {
      user_id: data.user_id,
      full_name: data.full_name,
      phone_no: data.phone_no,
      area_of_interests: data.area_of_interests,
      status: data.status,
    };
  }
  async deleteCustomer(id) {
    try {
      const customerdelete = await Customer.update(
        {
          status: -1,
        },
        {
          where: {
            user_id: id,
          },
        }
      );

      return customerdelete;
    } catch {
      throw new Error(error.message);
    }
  }
  async updateCustomer(customerDetail, userId) {
    try {
      const userExists = await Customer.findOne({
        where: {
          user_id: userId,
          status: 1,
        }});
      if (!userExists || null == userExists) {
        return 409;
        } else{
      const userupdate = await Customer.update(
        {
          full_name: customerDetail.full_name,
          phone_no: customerDetail.phone_no,
          area_of_interests: customerDetail.area_of_interests,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
      return userupdate;
      }
    } catch {
      throw new Error(error.message);
    }
  }
  async createUser(userData) {
    try {
      const userResponse = await axios.post(`${process.env.USER_SERVICE}`, {
        email: userData.email,
        password: userData.password,
        role: userData.role,
      });
      if (userResponse.data.result) {
        return userResponse.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async viewUsers() {
    try {
      const userResponse = await axios.get(`${process.env.USER_SERVICE_END_POINT}`
      );
      if (userResponse.data.data.result) {
        return userResponse.data.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async viewUsersById(userId) {
    try {
      const userResponse = await axios.get(`${process.env.USER_SERVICE_END_POINT}/${userId}`
      );
      if (userResponse.data.data.result) {
        return userResponse.data.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteUser(userId) {
    try {
      const userResponse = await axios.delete(`${process.env.USER_SERVICE_END_POINT}/${userId}`);
      if (userResponse.data) {
        return userResponse.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
module.exports = CustomerService;
