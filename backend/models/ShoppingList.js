const mongoose = require('mongoose');

const {Schema} = mongoose;

const ShoppingList = new Schema({
  name: String,
  quantity: String,
  isDone: {type: Boolean, default: false},
  //uid: String,
});

module.exports = mongoose.model('ShoppingList', ShoppingList);
