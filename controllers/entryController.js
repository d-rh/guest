const Entry = require("../models/entry");

exports.entryCreatePost = entry =>
  new Promise((resolve, reject) => {
    if (entry.body.newEntry) {
      const newEntry = new Entry({
        username: entry.cookies.username,
        content: entry.body.newEntry,
        date: new Date(),
        replies: []
      });
      newEntry
        .save()
        .then(doc => {
          resolve(doc);
        })
        .catch(err => {
          console.error(err);
        });
      resolve(newEntry);
    }
    if (!entry.body.newEntry.length) {
      reject('You have to include something in the entry!')
    }
  });
exports.getRecentEntries = () => {
  return new Promise((resolve, reject) => {
    const query = Entry.find().limit(10);
    resolve(query);
    if (err) reject(err);
  });
};
exports.replyCreatePost = reply => 
  new Promise((resolve, reject) => {
    if (reply.body.newReply) {
      console.log(reply);
      const query = { _id: reply.body.entryId }
      Entry.updateOne(query, { $push: { replies: {
        content: reply.body.newReply,
        author: reply.cookies.username,
        createdAt: new Date()
      }}}).exec();
      resolve(query);
      if (err) reject(err);
    }
  })
