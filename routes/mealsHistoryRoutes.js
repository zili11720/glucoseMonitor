// routes.js or app.js
const express = require("express");
const router = express.Router();
const mealController = require("../controllers/mealsHistoryController");

// Route for mealsHistory page
router.get("/mealsHistory", mealsHistoryController.mealsHistoryPage);

module.exports = router;
