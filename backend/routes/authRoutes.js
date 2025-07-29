const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

router.post("/login", controller.login);
router.put("/change-password", controller.changePassword);

module.exports = router;