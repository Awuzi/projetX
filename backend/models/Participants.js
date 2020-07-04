const mongoose = require('mongoose');

const {Schema} = mongoose;

const Participants = new Schema({
  gamerTag: String,
  teamName: String,
  //uid: String,
});

module.exports = mongoose.model('Participants', Participants);
