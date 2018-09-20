const Session = require('../models/session');

exports.sessionCreatePost = match => new Promise( (resolve, reject) => {

  // mongoDB generates _id field when a new
  // document is inserted and it omits
  // the _id field
  const session = new Session({

    username: match.username
  });

  session.save()
    .then((doc) => {

      console.log(doc);

      resolve(doc);

    })
    .catch((err) => {
      console.error(err);
    });

    resolve(session)
});

