const mongoose = require('mongoose');

const CurrenciesSchema = mongoose.Schema({
      name: String,
      shortName: String,
      sign: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Currency', CurrenciesSchema);