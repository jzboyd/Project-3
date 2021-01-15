const mongoose = require('mongoose')

const cryptoSchema = new.mongoose.Schema ({
  name: String,
  image: String,
  description: String
})

const Crypto = mongoose.model('Crypto', cryptoSchema)

module.exports = Crypto
