const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/entrollmentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware, enrollmentController.enrollUser);
router.get("/",authMiddleware, enrollmentController.viewEnrolledUser);
module.exports = router;
