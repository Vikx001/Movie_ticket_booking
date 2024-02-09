const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const {
  USER_SERVICE,
  CUSTOMER_SERVICE,
  ENROLLMENT_SERVICE,
  COURSE_SERVICE,
} = require("./config");

const app = express();

// CORS options
const corsOptions = {
  origin: "*", // or use a function to dynamically set the origin
  methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
};

app.use(cors());
app.use(express.json());

console.log(CUSTOMER_SERVICE);
app.use("/api/users", proxy(USER_SERVICE));
app.use("/api/customers", proxy(CUSTOMER_SERVICE));
app.use("/api/enrollment", proxy(ENROLLMENT_SERVICE));
app.use("/api/courses", proxy(COURSE_SERVICE));

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade"); // Or another policy as needed
  next();
});

app.listen(8880, () => {
  console.log("Gateway running on #8880");
});
