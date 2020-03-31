const Currency = require('../models/currencies.model.js');

// Retrieve and return all currencies from the database.
exports.findAll = (req, res) => {
    Currency.find()
        .then(currencies => {
            res.send(currencies);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while getting list of currencies."
            });
        });
};

// Create and Save a new Currency
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // Create a new Currency
    const currency = new Currency({
        name: req.body.name,
        shortName: req.body.shortName,
        sign: req.body.sign
    });

    // Save currency in the database
    currency.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something went wrong while creating new currency."
            });
        });
};

// Update a Currency identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Please fill all required field"
        });
    }

    // Find currency and update it with the request body
    Currency.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        shortName: req.body.shortName,
        sign: req.body.sign
    }, { new: true })
        .then(currency => {
            if (!currency) {
                return res.status(404).send({
                    message: "currency not found with id " + req.params.id
                });
            }
            res.send(currency);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "currency not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating currency with id " + req.params.id
            });
        });
};

// Delete a Currency with the specified id in the request
exports.delete = (req, res) => {
    Currency.findByIdAndRemove(req.params.id)
        .then(currency => {
            if (!currency) {
                return res.status(404).send({
                    message: "currency not found with id " + req.params.id
                });
            }
            res.send({ message: "currency deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "currency not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete currency with id " + req.params.id
            });
        });
};