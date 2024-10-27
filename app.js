const express = require("express");
const session = require("express-session"); //A session for managing user account- access to user's id after login
const userRouter = require("./routes/userRoutes"); // User-related routes
const newMealRouter = require("./routes/newMealRoutes"); // Add a users new meal routes
const mealsHistoryRoutes = require("./routes/mealsHistoryRoutes");
const predictionRoutes = require("./routes/predictionRoutes.js");
const { consumeGlucoseData } = require('./kafka/highGlucoseConsumer'); // Import the consumer

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "mySuperSecretKeyThatIsLongAndRandom12345",
    resave: false, // Forces session to be saved back to the session store, even if unmodified
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.get("/", (req, res) => {
  res.render("pages/index");
});

// Routes
app.use("/", userRouter); // User routes accessible from root URL
app.use("/home", newMealRouter); // Picture routes accessible from /home
app.use("/history", mealsHistoryRoutes);
app.use("/prediction", predictionRoutes);

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});