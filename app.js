const express = require('express')
const loginRouter = require('./routes/loginRoute'); // Import the login router
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
app.use('/', loginRouter);
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})