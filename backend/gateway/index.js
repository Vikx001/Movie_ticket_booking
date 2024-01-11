const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());
app.use(express.json());

app.use("customers", proxy("http://localhost:8881"));
app.use("enrollment", proxy("http://localhost:8882"));
app.use("courses", proxy("http://localhost:8883"));

app.listen(8880, () => {
  console.log("Gateway running on #8880");
});
