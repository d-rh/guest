const mongoose         = require('mongoose'),
      Schema           = mongoose.Schema,
      ObjectId         = mongoose.Types.ObjectId

sessionSchema = new Schema (
  {
    user: {Object, required: true}
    id: {String, required: true}
  }
)

module.exports = mongoose.model('Session', sessionSchema)