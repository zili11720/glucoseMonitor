const express = require("express");
const userRouter = require("./routes/userRoutes"); // User-related routes
const newMealRouter = require("./routes/newMealRoutes"); // Uploaded user's picture-related routes
const dateRoutes = require("./routes/dateRoutes"); // Date-related routes (including holiday API integration)

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("pages/index");
});

// Routes
app.use("/", userRouter); // User routes accessible from root URL
app.use("/home", newMealRouter); // Picture routes accessible from /home
app.use("/home", dateRoutes); // Specific date routes

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
