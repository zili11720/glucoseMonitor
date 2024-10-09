const dateModel = require("../models/dateModel");

exports.getDateType = async (req, res) => {
  try {
    // Get the date from the user; if not provided, default to the current date
    const userDate =
      req.query.mealDate || new Date().toISOString().split("T")[0];

    // Call the date model with the user's date
    const { date, dayType } = await dateModel.getDateType(userDate);
    console.log("User-selected date:", userDate, "Day Type:", dayType);
  } catch (error) {
    console.error("Error fetching day type:", error);
    res.status(500).send("Error fetching day type");
  }
};
