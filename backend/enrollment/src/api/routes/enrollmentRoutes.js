const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/entrollmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", enrollmentController.enrollUser);
router.get("/",authMiddleware, enrollmentController.viewEnrolledUser);
// GET /enrollment/:id - Retrieve  data by customerid
router.get("/:id/customerid",authMiddleware, enrollmentController.viewEnrolledUserByCustId);
// GET /enrollment/:id - Retrieve  data by courseid
router.get("/:id/courseid",authMiddleware, enrollmentController.viewEnrolledUserByCourseId);
// DELETE /enrollment/:id - Delete an enrollment
router.delete("/:id",authMiddleware, enrollmentController.deleteEnrollment);
module.exports = router;
