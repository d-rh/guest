const mongoose         = require('mongoose'),
      Schema           = mongoose.Schema,
      // ObjectId         = mongoose.Types.ObjectId

sessionSchema = new Schema (
  {
    user: {}
  }
);

module.exports = mongoose.model('Session', sessionSchema)