
const Entry = require("../../models/entry");

const createEntry = (entry) => {
  return new Promise((resolve, reject) => {
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
  })
}
module.exports = createEntry;