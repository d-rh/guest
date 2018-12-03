const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const entrySchema = new Schema(
  {
    username: { type: String, required: true },
    content: { type: String, required: true },
    date: {},
    replies: []
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Entry", entrySchema);