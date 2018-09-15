const Session = require('../models/session');

exports.sessionCreatePost = (user) => {
  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const session = new Session({

  });

  session.save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
};