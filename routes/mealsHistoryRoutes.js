const express = require("express");
const router = express.Router();
const mealsHistoryController = require("../controllers/mealsHistoryController");

router.get('/', (req, res) => {
  res.render('pages/history',{ mealsData: null });
});

// Route for fetching meals history within a date range
router.get("/mealsHistory", mealsHistoryController.getMealsHistory);
  

module.exports = router;
