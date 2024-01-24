const Enrollment = require("../../models/entrollmentModel");
const Joi = require("joi");
const axios = require("axios");
const fs = require('fs/promises');
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
  async viewEnrolledUser(token,data) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:['id','customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at']
    });

    const course = await axios(
      {
        method:'get',
        url:"http://localhost:8883/",
        params: {
          search:"" ,
          order_by:"",
          sort:""
        }
      });
   
      const enrolls = JSON.parse(JSON.stringify(enrollment));
      const courses = JSON.parse(JSON.stringify(course.data.data));

      const enrollDetail = enrolls.map((enrolls) => {
      const courseDetail = courses.find((c) => c.id === enrolls.course_id);
        return {
          ...enrolls,
          ...courseDetail
        };
      });

    return enrollDetail;

    } catch (error) {
      return error.message;
    }
  }
  async viewEnrolledUserByCustId(token,Id) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:['id','customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at'],
        where: {
          customer_id : Id
      }
    });
    
      const course = await axios(
        {
          method:'get',
          url:"http://localhost:8883/",
          params: {
            search:"" ,
            order_by:"",
            sort:""
          }
        });
 
      const enrolls = JSON.parse(JSON.stringify(enrollment));
      const courses = JSON.parse(JSON.stringify(course.data.data));
      
      const enrollDetail = enrolls.map((enrolls) => {
      const courseDetail = courses.find((c) => c.id === enrolls.course_id);
        return {
          ...enrolls,
          ...courseDetail
        };
      });

    return enrollDetail;

    } catch (error) {
      return error.message;
    }
  }
  async viewEnrolledUserByCourseId(token,Id) {
    try {
      const enrollment = await Enrollment.findAll({
        attributes:['id','customer_id','course_id',"status","payment_method","payment_status","enrollment_date",'created_at','updated_at'],
        where: {
          course_id : Id
      }
    });
    const course = await axios(
      {
        method:'get',
        url:"http://localhost:8883/",
        params: {
          search:"" ,
          order_by:"",
          sort:""
        }
      });
      
      const enrolls = JSON.parse(JSON.stringify(enrollment));
      const courses = JSON.parse(JSON.stringify(course.data.data));
      
      const enrollDetail = enrolls.map((enrolls) => {
      const courseDetail = courses.find((c) => c.id === enrolls.course_id);
        return {
          ...enrolls,
          ...courseDetail
        };
      });

    return enrollDetail;

    } catch (error) {
      return error.message;
    }
  }
  async deleteEnrollment(token,Id) {
    const enroll = await Enrollment.findByPk(Id);
    if (!enroll)
    {
      throw new Error("Enrollment not found");
    }
    try
    {
      const deletEnrollment = await Enrollment.update({
        status:0
      },{
          where:{
              id: Id
          }
      });
    return deletEnrollment;
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = EnrollmentService;
