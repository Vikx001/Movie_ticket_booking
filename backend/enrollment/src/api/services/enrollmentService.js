const Enrollment = require("../../models/enrollmentModel");
const Course = require("../../models/enrollmentModel");
const Joi = require("joi");
const axios = require("axios");

class EnrollmentService {
  async enrollUser(data) {
    try {
      const enrollment = await Enrollment.create(this.extractEnrollFields(data));
      return enrollment;
    } 
    catch (error) {
      throw new Error(error.message);
    }
  }
  async viewEnrolledUser(data) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:[ ['id', 'enrollment_id'],'customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at']
    });
      return enrollment;
    } catch (error) {
      return error.message;
    }
  }
  async viewEnrolledUserByCourseId(id) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:[['id', 'enrollment_id'],'customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at'],
        where: {
          course_id: id,
        },
    });
      return enrollment;
    } catch (error) {
      return error.message;
    }
  }
  async viewCourses (data) {
    try {
      const userResponse = await axios.get(`${process.env.COURSE_SERVICE_END_POINT}` );
        if (userResponse.data) {
        return userResponse.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async viewCustomers() {
    try {
      const customerResponse = await axios.get(`${process.env.CUSTOMER_SERVICE_END_POINT}`);
      if (customerResponse.data) {
        return customerResponse.data;
      } else {
        return 409;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  extractEnrollFields(data) {
    return {
      customer_id: data.customer_id,
      course_id: data.course_id,
      status :1 ,
      payment_method: data.payment_method,
      payment_status: data.payment_status,
      enrollment_date: data.enrollment_date,
    };
  }
}
module.exports = EnrollmentService;