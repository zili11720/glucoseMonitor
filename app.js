const express = require("express");
const session = require("express-session"); //A session for managing user account- access to user's id after login
const http = require('http');
const socketIo = require('socket.io');//Socket for real time messeges
const userRouter = require("./routes/userRoutes"); // User-related routes
const newMealRouter = require("./routes/newMealRoutes"); // New meal related routes
const mealsHistoryRoutes = require("./routes/mealsHistoryRoutes");//Meals history related routes
const predictionRoutes = require("./routes/predictionRoutes.js");// Prediction related routes
const messageService = require('./kafka/messageService');//Real time message handler

const app = express();//Use express framework
const server = http.createServer(app);// Create an HTTP server and pass in the Express app to handle requests
const io = socketIo(server);
const port = 3000;

app.use(express.static("public")); // Serve static files from the "public" directory, like CSS, JS, and images.
app.set("view engine", "ejs"); // Set EJS as the template engine for rendering HTML views.
app.use(express.json()); // Parse JSON data sent in request bodies.
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data sent in request bodies.

// Initialize messageService with the Socket.io instance
messageService.initializeSocket(io);

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for messages from the client
  //socket.on('kafka message', (msg) => {
    //  messageService.broadcastMessage(msg);
  //});

  // Handle disconnection
  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});

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
app.use("/history", mealsHistoryRoutes);//etc.
app.use("/prediction", predictionRoutes);

// Error handling for 404 not found
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});