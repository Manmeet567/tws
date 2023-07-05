const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const UserRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes for frontend purposes
app.get('/', (req,res) => {
    res.status(200).render('Home')
})
app.get('/api/user/login', (req,res) => {
    res.status(200).render('Login');
})
app.get('/api/user/register', (req,res) => {
    res.status(200).render('Signup');
})

// routes
app.use('/api/user', UserRoutes)


mongoose.connect(process.env.MONGO_URI)
 .then(() => {
     app.listen(PORT, () => {
         console.log('Server started at PORT : ' + PORT)
     })
 })
 .catch((err) => {
    console.log(err)
 })
