const mongoose = require('mongoose');

const {Schema} = mongoose;

const Tournoi = new Schema({
  name: String,
  date: Date,
  game: String,
  gameId: Number,
  participants: Array,
  isFinish: {type: Boolean, default: false},
  //uid: String,
});

module.exports = mongoose.model('Tournoi', Tournoi);
