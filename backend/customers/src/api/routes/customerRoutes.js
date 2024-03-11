const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middleware/authMiddleware");

//Create new Customer
router.post("/", customerController.createCustomer);

//List all Customers
router.get("/", customerController.listCustomers);

// GET /customer/:id - Retrive customer details
router.get("/:id", customerController.viewCustomer);

// GET /customer/user/:id - Retrive customer details by user id
router.get("/user/:id", customerController.viewCustomerByUserId);

// UPDATE /user/:id - update a customer
router.put("/:id", authMiddleware, customerController.updateCustomer);
module.exports = router;

// DELETE /customer/:id - Delete a customer
router.delete("/:id", authMiddleware, customerController.deleteCustomer);
