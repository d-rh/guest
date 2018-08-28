const mongoose        = require('mongoose'),
      schema          = mongoose.Schema,
      bcrypt          = require(bcrypt),
      SALT_WORK_FACTOR = 10,
      ObjectId        = mongoose.Schema.Types.ObjectId;

friendSchema = new Schema(
  {
    uId: new ObjectId;
    first_name    :     {type: String, required: true, max: 50},
    family_name   :     {type: String, requried: true, max: 100},
    username      :     {type: String, required: true}
    password      :     {type: String, required: true}
  }
);

friendSchema.pre('save', { let user = this;
  if (!user.isModified('password')) return next();
});

// we need more salt.
bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
  if (err) return next(err);

  // hash that pw!
  bcrypt.hash(user.password, salt, (err, hash) {
    if (err) return next(err);
      // replace cleartext with hashed pw
    user.password = hash;
    next()
  }) 
});

// Virtual full name
friendSchema
  .virtual('name')
  .get( () => {
    return this.first_name + ', ' + this.family_name;
});

module.exports = mongoose.model('Friend', friendSchema);