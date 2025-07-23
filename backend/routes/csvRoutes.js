const express = require("express");
const router = express.Router();
const controller = require("../controllers/csvController");

router.post("/import", controller.importCSV);
router.get("/export", controller.exportCSV);

module.exports = router;