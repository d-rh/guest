// ~/controllers/friendController.js

const Friend = require('../models/friend');

exports.valReg = async (req) => {
  let errors = [];
  let formUserName = req.formUserName;
  let firstName = req.formFirstName;
  let lastName = req.formLastName;
  let password = req.password;
  let passConf = req.passConf;
  if (typeof formUserName === 'undefined') errors.push('Please create a username with at least 3 characters');
  if (typeof firstName === 'undefined') errors.push('Please enter your first name');
  if (typeof lastName === 'undefined') errors.push('Please enter your last name');
  if (password.length < 5) errors.push('Please enter at least five characters for a password');
  if (!(password === passConf)) errors.push('Please ensure Password and Password Confirmation match');
  if (errors.length === 0) {
    await Friend.findOne({ username: req.formUserName}, (err, match) => {
      try {
        if (match) errors.push('Another user with this username already exists!');
      } catch (err) {
        errors.push(err)
      }
    });
    // await Friend.findOne({ email: req.email}, (err, match) => {
    //   try {
    //     if (match) errors.push('A user with this email address already exists!');
    //   } catch (err) {
    //     errors.push(err)
    //   }
    // });
  }
  return {
    formUserName: formUserName,
    firstName: firstName,
    lastName: lastName,
    errors: errors
  };
}


exports.friendCreatePost = (friend) => {
  // mongoDB generates _id field when a new
  // document is saved without an id field
  const user = new Friend({
    username: friend.formUserName,
    firstName: friend.formFirstName,
    lastName: friend.formLastName,
    password: friend.password,
  });

  return user.save()
    .then((doc) => {
      console.log(doc)
      return 'success';
    })
    .catch((err) => {
      console.error(err);
      return 'error';
    });
};
