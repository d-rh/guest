const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const friendSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 50 },
    last_name: { type: String, requried: true, max: 100 },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

friendSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

friendSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Virtual full name
friendSchema.virtual('name').get(() => `${this.first_name}, ${this.last_name}`);

module.exports = mongoose.model('Friend', friendSchema);
