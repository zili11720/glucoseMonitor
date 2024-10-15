const express = require("express");
const router = express.Router();
const mealsHistoryController = require("../controllers/mealsHistoryController");

// Route for fetching meals history within a date range
router.get("/mealsHistory", mealsHistoryController.getMealsHistory);

module.exports = router;
