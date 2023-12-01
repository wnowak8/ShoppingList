const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
  name: String,
  category: String,
  quantity: Number,
});

module.exports = mongoose.model('Item', itemSchema);
