const mongoose = require("mongoose");
require("./Comment");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  ayaar: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  img: {
    type: String, // تایپ عکس استرینگه بخاطره آدرسش
    required: true,
  },
  comments: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
});

const model = mongoose.models.Product || mongoose.model("Product", schema);

export default model;
