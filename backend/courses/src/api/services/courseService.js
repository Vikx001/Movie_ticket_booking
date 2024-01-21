const Course = require("../../models/courseModel");
const Chapter = require("../../models/courseChapterModel");
const { Op } = require("sequelize");

class CourseService {
  async createCourse(data) {
    try {
      const course = await Course.create(this.extractCourseFields(data));
      await this.handleChapters(course.id, data.chapters);
      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async editCourse(courseId, data) {
    try {
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error("Course not found!");
      }

      await course.update(this.extractCourseFields(data));
      await this.handleChapters(courseId, data.chapters);
      return course;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Extracts course fields from data
  extractCourseFields(data) {
    return {
      title: data.title,
      description: data.description,
      learning_outcomes: data.learning_outcomes,
      course_inclusions: data.course_inclusions,
      is_certified: data.is_certified,
      author: data.author,
      rating: data.rating,
      total_enrollments: data.total_enrollments,
      status: data.status,
      chapters: data.chapters,
    };
  }

  // Handle creation and updating of chapters
  async handleChapters(courseId, chapters) {
    if (chapters && chapters.trim() !== "") {
      const chapter_data = JSON.parse(chapters);
      const chapter_data_with_course = chapter_data.map((chapter) => ({
        ...chapter,
        course_id: courseId,
      }));

      await Chapter.destroy({ where: { course_id: courseId } });
      await Chapter.bulkCreate(chapter_data_with_course);
    }
  }

  //Delete a course from the database
  async deleteCourse(courseId) {
    const course = await Course.findByPk(courseId);

    if (!course) {
      throw new Error("Course not found");
    } else {
      try {
        course.status = "-1";
        const deleteCourse = await course.save();
        return deleteCourse;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  //Fetch all courses those are not deleted

  async getAllCourses(searchTerm, order, sort) {
    console.log(order);
    let searchField = {
      where: {
        status: {
          [Op.ne]: "-1",
        },
      },
    };

    let orderField;

    if ("" != searchTerm) {
      searchField.where.title = {
        [Op.like]: `%${searchTerm}%`,
      };
    }

    if ("" != order) {
      orderField = {
        order: [[order, sort]],
      };
    }

    try {
      const courses = await Course.findAll(orderField);
      return courses;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CourseService;
