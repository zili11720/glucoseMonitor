const express = require("express");
const router = express.Router();
const mealsHistoryController = require("../controllers/mealsHistoryController");

// Route for fetching meals history within a date range
router.get("/mealsHistory", (req, res, next) => {
    console.log("GET /mealsHistory route hit"); // Debugging line
    next(); // Call the next middleware/controller
  }, mealsHistoryController.getMealsHistory);
  

module.exports = router;
