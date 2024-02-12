const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { error } = require("winston");
const userRoutes = require("./api/routes/userRoutes");
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

const APP_PORT = ENROLLMENT_SERVICE_PORT || 8881;

app.listen(APP_PORT, () => {
  console.log(`Enrollment Service running on #${APP_PORT}`);
});
