const express = require("express");
const router = express.Router();
const controller = require("../controllers/memberController");

router.get("/", controller.getAllMembers);
router.post("/", controller.createMember);
router.put("/:id", controller.updateMember);
router.delete("/:id", controller.deleteMember);

module.exports = router;
