// ./models/session.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    answer: {String}
  },
  {  
    timestamps: true,
  },
);



module.exports = mongoose.model('Session', sessionSchema);
