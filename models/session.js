// ./models/session.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    first_name: {type: String, required: true}
  },
  {  
    timestamps: true,
  },
);



module.exports = mongoose.model('Session', sessionSchema);
