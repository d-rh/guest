const Entry = require("../models/entry");

exports.entryCreatePost = entry =>
  new Promise((resolve, reject) => {
    if (entry.body.newEntry) {
      const newEntry = new Entry({
        username: entry.cookies.username,
        content: entry.body.newEntry,
        date: new Date()
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
    if (!entry.body.newEntry) {
      reject('You have to include something in the entry!')
    }
  });
exports.getRecentEntries = () => {
  return new Promise((resolve, reject) => {
    const query = Entry.find().limit(10);
    resolve(query);
    if (err) reject(err);
    // const query = Entry.where({});
    // let recentEntries = [];

    // try {
    //   return query.find((err, entries) => {
    //     if (err) reject(err);
    //     console.log("out of database", entries.length);
    //     entries.forEach(entry => {
    //       recentPostCheck(entry.date) ? recentEntries.unshift(entry) : "";
    //     });
    //     console.log("post filters", recentEntries.length);
    //     resolve(recentEntries);
    //   });
    // } catch (err) {
    //   console.error(err);
    //   reject(err);
    // }
  });
};
// const recentPostCheck = entryDate => {
//   const currentDate = new Date();
//   const currentTime = currentDate.getTime();
//   const entryTime = entryDate.getTime();
//   // last ten days
//   if (currentTime <= entryTime + 864000000) {
//     return true;
//   } else {
//     return false;
//   }
// };
