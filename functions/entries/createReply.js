const Entry = require("../../models/entry");

const createReply = (reply) => {
  return new Promise((resolve, reject) => {
    if (reply.body.newReply) {
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
}
module.exports = createReply;