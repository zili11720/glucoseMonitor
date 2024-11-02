const express = require("express");
const session = require("express-session"); //A session for managing user account- access to user's id after login
const http = require('http');
const socketIo = require('socket.io');//Socket for real time messeges
const userRouter = require("./routes/userRoutes"); // User-related routes
const newMealRouter = require("./routes/newMealRoutes"); // New meal routes
const mealsHistoryRoutes = require("./routes/mealsHistoryRoutes");
const predictionRoutes = require("./routes/predictionRoutes.js");
const messageService = require('./kafka/messageService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize messageService with the Socket.io instance
messageService.initializeSocket(io);

// Handle Socket.io connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for messages from the client
  socket.on('kafka message', (msg) => {
      messageService.broadcastMessage(msg);
  });

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
app.use("/history", mealsHistoryRoutes);
app.use("/prediction", predictionRoutes);

// Error handling for 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});