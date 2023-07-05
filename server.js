const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const UserRoutes = require("./routes/userRoutes");

const app = express();

// middlewares
app.use(express.json())

// routes
app.use('/api/user', UserRoutes)


mongoose.connect(process.env.MONGO_URI)
 .then(() => {
     app.listen(process.env.PORT, () => {
         console.log('Server started at PORT : ' + process.env.PORT)
     })
 })
 .catch((err) => {
    console.log(err)
    res.status(500).json({error:'Internal Server Error : check your connection'})
 })
