const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("winston");
<<<<<<< HEAD
const userRoutes = require("./api/routes/userRoutes");
=======
const enrollmentRoutes = require("./api/routes/enrollmentRoutes");
>>>>>>> e0ea9a542f53af21b54bc36f6918ec78c7019b26
const { ENROLLMENT_SERVICE_PORT } = require("./config");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(enrollmentRoutes);

// Error handling for unsupported routes
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

<<<<<<< HEAD
const APP_PORT = ENROLLMENT_SERVICE_PORT || 8881;
=======
const APP_PORT = ENROLLMENT_SERVICE_PORT || 8883;
>>>>>>> e0ea9a542f53af21b54bc36f6918ec78c7019b26

app.listen(APP_PORT, () => {
  console.log(`Enrollment Service running on #${APP_PORT}`);
});
