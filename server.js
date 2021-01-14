//DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')

//CONFIGURATION
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

//MIDDLEWARE
app.use(express.json())
app.use(express.static('public'))

//CONTROLLER


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})


// ERROR / Success
mongoose.connection.on('error', err =>
console.log(
  err.message,
  ' is mongod not running?/Problem with Atlas Connection?'
  )
)

mongoose.connection.on("connected", () => {
  console.log("mongo connected: ", MONGODB_URI);
})

mongoose.connection.on('disconnected', () => {
  console.log("mongo disconnected");
})

//LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
