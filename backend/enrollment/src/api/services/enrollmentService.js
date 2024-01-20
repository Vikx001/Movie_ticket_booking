const Enrollment = require("../../models/entrollmentModel");
const Course = require("../../models/entrollmentModel");
const Joi = require("joi");

class EnrollmentService {
  async enrollUser(data) {
    const {
      customer_id,
      course_id,
      status,
      payment_method,
      payment_status,
      enrollment_date,
    } = data;
   
    try {
      const enrollment = await Enrollment.create({
        customer_id,
        course_id,
        status,
        payment_method,
        payment_status,
        enrollment_date
      });
      return enrollment;
    } 
    catch (error) {
      return error.message;
    }
  }
  async viewEnrolledUser(data) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:['id','customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at']
    });
      return enrollment;
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = EnrollmentService;
