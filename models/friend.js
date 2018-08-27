const mongoose    = require('mongoose'),
      schema      = mongoose.Schema,
      ObjectId    = mongoose.Schema.Types.ObjectId,

friendSchema = new Schema(
  {
    uId: new ObjectId;
    first_name    :     {type: String, required: true, max: 50},
    family_name   :     {type: String, requried: true, max: 100},
    username      :     {type: String, required: true}
    password      :     {type: String, required: true}
  }
)

// Virtual full name
friendSchema
  .virtual('name')
  .get( () => {
    return this.first_name + ', ' + this.family_name;
});

module.exports = mongoose.model('Friend', friendSchema);