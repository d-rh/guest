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
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

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