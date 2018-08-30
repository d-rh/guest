const mongoose          = require('mongoose'),
      Schema            = mongoose.Schema,
      bcrypt            = require('bcrypt'),
      SALT_WORK_FACTOR  = 10,
      ObjectId          = mongoose.Types.ObjectId;

friendSchema = new Schema(
  {
    // uId           :     new ObjectId,
    first_name    :     {type: String, required: true, max: 50},
    last_name     :     {type: String, requried: true, max: 100},
    username      :     {type: String, required: true},
    password      :     {type: String, required: true}
  }
);

// Virtual full name
friendSchema
  .virtual('name')
  .get( () => {
    return this.first_name + ', ' + this.family_name;
});

module.exports = mongoose.model('FriendModel', friendSchema);