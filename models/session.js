const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// ObjectId         = mongoose.Types.ObjectId


module.exports = mongoose.model('Session', new Schema(
  {
    timestamps: true,
  },
));
