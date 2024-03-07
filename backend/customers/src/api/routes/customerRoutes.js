const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", customerController.createCustomer);

router.get("/", customerController.viewCustomer);
// GET /user/:id - Retrive a customer
router.get("/:id", customerController.viewCustomerById);
// DELETE /customer/:id - Delete a customer
router.delete("/:id",authMiddleware, customerController.deleteCustomer);
// UPDATE /user/:id - update a customer
router.put("/:id",authMiddleware, customerController.updateCustomer);
module.exports = router;