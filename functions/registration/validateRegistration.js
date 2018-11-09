const Friend = require('../../models/friend')

const validateRegistration = async (req) => {
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
      if (match) errors.push('Another user with this username already exists!');
      if (err) errors.push(err)
    });
  }
  return {
    formUserName: formUserName,
    firstName: firstName,
    lastName: lastName,
    errors: errors
  };
}
module.exports = validateRegistration;