const mongoose    = require('mongoose'),
      Schema      = mongoose.Schema,
      ObjectId    = mongoose.Types.ObjectId;

friendSchema = new Schema(
  {
    first_name    :     {type: String, required: true, max: 50},
    last_name     :     {type: String, requried: true, max: 100},
    username      :     {type: String, required: true, unique: true},
    password      :     {type: String, required: true}
  }
);

// Virtual full name
friendSchema
  .virtual('name')
  .get( () => { return this.first_name + ', ' + this.last_name; });

module.exports = mongoose.model('Friend', friendSchema);