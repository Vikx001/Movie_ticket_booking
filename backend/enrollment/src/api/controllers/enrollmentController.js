const HttpStatus = require("../../utils/HttpStatus");
const enrollmentService = require("../services/enrollmentService");
const enrollmentValidationSchema = require("../validations/enrollmentSchema");
const service = new enrollmentService();
const Joi = require("joi");

const EnrollmentController = {
  /**
   * This function validate the given request and trigger the Enrollment Service
   * @param {*} req
   * @param {*} res
   * @returns JsonResponse
   */
  async enrollUser(req, res) {
    const { error } = enrollmentValidationSchema.validate(req.body);
    if (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: error.details[0].message });
    } 
    else {
      try {
        const course = await service.enrollUser(req.body);
        res.status(HttpStatus.CREATED).send({
          message: "User has been enrolled successfully",
          data: course,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error in enrollment", error: error.message });
      }
    }
  },
  async viewEnrolledUser(req, res) {
      try {
        const course = await service.viewCourses(req.body);
        if (409 != course) {
        const enroll = await service.viewEnrolledUser(req.body);
        const courses = JSON.parse(JSON.stringify(course.data));
        const enrolls = JSON.parse(JSON.stringify(enroll));
        const enrollDetail = enrolls.map((enrolls) => {
          const courseDetail = courses.find((c) => c.id === enrolls.course_id);
          return {
            ...enrolls,
            ...courseDetail,
          };
        });
        return res.status(HttpStatus.CREATED).json({
          message: "Enrollment details have been fetched successfully.",
          data: enrollDetail,
        });
      }
      else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "user is Empty!"
        });
      }
        
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error in enrollment", error: error.message });
      }
  },
  async viewEnrolledUserByCourseId(req, res) {
    try {
      const courseId = req.params.id;
      const enroll = await service.viewEnrolledUserByCourseId(courseId);
      if (enroll.length === 0)
      { return res.status(HttpStatus.OK).json({
        message: "Enrollment is not exist in the course"}); }else{
      const course = await service.viewCourses(req.body);
      const courses = JSON.parse(JSON.stringify(course.data));
      const enrolls = JSON.parse(JSON.stringify(enroll));
      const enrollDetail = enrolls.map((enrolls) => {
        const courseDetail = courses.find((c) => c.id === enrolls.course_id);
        return {
          ...enrolls,
          ...courseDetail,
        };
      });
      return res.status(HttpStatus.OK).json({
        message: "Enrollment details have been fetched successfully.",
        data: enrollDetail,
      });
    }
      
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: "Error in enrollment", error: error.message });
    }
},

  
};

module.exports = EnrollmentController;