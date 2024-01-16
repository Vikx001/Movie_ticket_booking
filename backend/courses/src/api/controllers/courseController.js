const courseService = require("../services/courseService");
const service = new courseService();
const Joi = require("joi");

const CourseController = {
  /**
   * This function validate the given request and trigger the Course Service
   * @param {*} req
   * @param {*} res
   * @returns JsonResponse
   */
  async createCourse(req, res) {
    const validationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      learning_outcomes: Joi.any(),
      course_inclusions: Joi.any(),
      is_certified: Joi.number().max(1).required(),
      author: Joi.string().required(),
      status: Joi.number().max(1).required(),
      rating: Joi.number().min(0).required(),
      total_enrollments: Joi.number().min(0).required(),
      chapters: Joi.any(),
    });

    const { error } = validationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    } else {
      try {
        const course = await service.createCourse(req.body);
        res.status(201).send({
          message: "Course has been created successfully",
          data: course,
        });
      } catch (error) {
        res
          .status(500)
          .send({ message: "Error creating Course", error: error.message });
      }
    }
  },
};

module.exports = CourseController;
