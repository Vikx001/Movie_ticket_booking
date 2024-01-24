const enrollmentService = require("../services/enrollmentService");
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
    const validationSchema = Joi.object({
      customer_id: Joi.number().min(0).required(),
      course_id:Joi.number().min(0).required(),
      enrollment_date: Joi.date(),
      payment_method: Joi.string().required(),
      payment_status: Joi.number().min(0).required(),
      status: Joi.number().max(1).required()
    });
   
    const { error } = validationSchema.validate(req.body);

    if (error) {    
      return res.status(400).json({ message: error.details[0].message });
    } 
    else {
      try { 
        const course = await service.enrollUser(req.body);
        res.status(201).send({
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
        const enroll = await service.viewEnrolledUser(req.headers,req.body);
        return res.json(enroll);
        
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error in enrollment", error: error.message });
      }
  },
  async viewEnrolledUserByCustId(req, res) {
    try {
      const customerId = req.params.id;
      const enroll = await service.viewEnrolledUserByCustId(req.headers,customerId);
      return res.json(enroll);
      
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error in enrollment", error: error.message });
    }
  },
  async viewEnrolledUserByCourseId(req, res) {
    try {
      const courseId = req.params.id;
      const enroll = await service.viewEnrolledUserByCourseId(req.headers,courseId);
      return res.json(enroll);
      
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error in enrollment", error: error.message });
    }
  },
  async deleteEnrollment(req, res) {
    try {
      const enrollID = req.params.id;
      const enroll = await service.deleteEnrollment(req.headers,enrollID);
      res
      .status(200)
      .status(200).send({ message: `Enrollment ${enrollID} deleted successfully` });
      
    } catch (error) {
      res
        .status(500)
        .send({ message: "Error in enrollment", error: error.message });
    }
  }
};

module.exports = EnrollmentController;
