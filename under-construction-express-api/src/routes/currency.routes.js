const express = require('express')
const router = express.Router()
const currencyController = require('../controllers/curency.controllers');

// Retrieve all Currencys
router.get('/', currencyController.findAll);

// Create a new Currency
router.post('/', currencyController.create);

// Update a Currency with id
router.put('/:id', currencyController.update);

// Delete a Currency with id
router.delete('/:id', currencyController.delete);

module.exports = router