const Course = require("../../models/courseModel");
const Chapter = require("../../models/courseChapterModel");
const Joi = require("joi");

class CourseService {
  async createCourse(data) {
    const {
      title,
      description,
      learning_outcomes,
      course_inclusions,
      is_certified,
      author,
      rating,
      total_enrollments,
      status,
      chapters,
    } = data;
    try {
      const course = await Course.create({
        title,
        description,
        learning_outcomes,
        course_inclusions,
        is_certified,
        author,
        rating,
        total_enrollments,
        status,
      });
      if (course && "" !== chapters) {
        const chapter_data = JSON.parse(chapters);
        const chapter_data_with_course = chapter_data.map((chapter) => ({
          ...chapter,
          course_id: course.id,
        }));
        //console.log(chapter_data_with_course);
        Chapter.bulkCreate(chapter_data_with_course);
      }
      course.chapters = chapters;
      return course;
    } catch (error) {
      return error.message;
    }
  }
}
module.exports = CourseService;
