const mongoose         = require('mongoose'),
      Schema           = mongoose.Schema,
      ObjectId         = mongoose.Types.ObjectId,
      SALT_WORK_FACTOR = 10,
      bcrypt           = require('bcrypt')

friendSchema = new Schema(
  {
    first_name  :     {type: String, required: true, max: 50},
    last_name   :     {type: String, requried: true, max: 100},
    username    :     {type: String, required: true, unique: true},
    password    :     {type: String, required: true},
  },
  {
    timestamps  :     true
  }
);

friendSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

friendSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Virtual full name
friendSchema
  .virtual('name')
  .get( () => { return this.first_name + ', ' + this.last_name; });

module.exports = mongoose.model('Friend', friendSchema);