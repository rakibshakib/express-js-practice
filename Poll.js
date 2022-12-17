const { Schema, model } = require("mongoose");
const pollSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  totalvalue: Number,
  options: {
    type: [
      {
        name: String,
        vote: Number,
      },
    ],
  },
});
const Poll = model("poll", pollSchema);
module.export = Poll;
