const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// ObjectId         = mongoose.Types.ObjectId


const sessionSchema = new Schema({
  user: {},
});

module.exports = mongoose.model('Session', sessionSchema);
