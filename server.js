const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const UserRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json())

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
    res.status(500).json({error:'Internal Server Error : check your connection'})
 })
