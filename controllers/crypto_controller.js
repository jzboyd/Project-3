const express = require('express')
const cryptos = express.Router()

const Crypto = require('../models/crypto.js')

cryptos.get('/', (req, res) => {
  Crypto.find({}, (error, foundCrypto) => {
    res.json(foundCrypto)
  })
})

// create

cryptos.post('/', (req,res) => {
  Crypto.create(req.body, (error, createdCrypto) => {
    Crypto.find({}, (error, foundCrypto) => {
      res.json(foundCrypto)
    })
  })
})

// update

cryptos.put('/:id', (req, res) => {
  Crypto.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (error, updatedCrypto) => {
      if(error) {
        res.send(error)
      } else {
        Crypto.find({}, (error, foundCrypto) => {
          res.json(foundCrypto)
        })
      }
    }
  )
})

// delete

cryptos.delete('/:id', (req, res) => {
  Crypto.findByIdAndRemove(req.params.id, (error, deletedCrypto) => {
    Crypto.find({}), (error, foundCrypto) => {
      res.json(foundCrypto)
    })
  })
})

module.exports = cryptos
