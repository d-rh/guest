const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    username: {type: String, required: true}
  },
  {  
    timestamps: true,
  },
);



module.exports = mongoose.model('Session', sessionSchema);