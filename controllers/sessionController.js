<<<<<<< HEAD
const Session = require('../models/session');

exports.sessionCreatePost = user => new Promise( (resolve, reject) => {
=======
// ~/controllers/sessionControllers.js

const Session = require('../models/session');

exports.sessionCreatePost = match => new Promise( (resolve, reject) => {
>>>>>>> ca2d342de637c9ea4cfc43d4f3f3756e534e9446
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const session = new Session({
<<<<<<< HEAD

=======
    username: match.username
>>>>>>> ca2d342de637c9ea4cfc43d4f3f3756e534e9446
  });

  session.save()
    .then((doc) => {
<<<<<<< HEAD
      console.log(doc);
=======
      resolve(doc);
>>>>>>> ca2d342de637c9ea4cfc43d4f3f3756e534e9446
    })
    .catch((err) => {
      console.error(err);
    });
<<<<<<< HEAD

  resolve(session)
});
=======
});
>>>>>>> ca2d342de637c9ea4cfc43d4f3f3756e534e9446
