const express = require("express");
const router = express.Router();
const dateController = require("../controllers/dateController");

router.get("/getDateType", dateController.getDateType);

module.exports = router;
