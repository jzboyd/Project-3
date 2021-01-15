const express = require('express')
const crypto = express.Router()

const Crypto = require('..models/crypto.js')

crypto.get('/', (req, res) => {
  Crypto.find({}, (error, foundCrypto) => {
    res.json(foundCrypto)
  })
})

// create

crypto.post('/', (req,res) => {
  Crypto.create(req.body, (error, createdCrypto) => {
    Crypto.find({}, (error, foundCrypto) => {
      res.json(foundCrypto)
    })
  })
})

// update

crypto.put('/', (req, res) => {
  Crypto.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
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

crypto.delete('/:id', (req, res) => {
  Crypto.findByIdAndRemove(req.params.id, (error, deletedCrypto) => {
    Crypto.find({}), (error, foundCrypto) => {
      res.json(foundCrypto)
    }
  })
})

module.exports = crypto
