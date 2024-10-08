const express = require('express')
const userRouter = require('./routes/userRoutes'); // User-related routes
const newMealRouter = require('./routes/newMealRoutes'); //Aploaded user's picure-related routes
const app = express()
const port = 3000

app.use(express.static('public'))
app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('pages/index')
  })

// Routes
app.use('/', userRouter); // User routes accessible from root URL
app.use('/home', newMealRouter); // Picture routes accessible from /home
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})