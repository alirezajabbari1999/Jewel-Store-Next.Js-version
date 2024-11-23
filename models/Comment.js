const mongoose = require("mongoose");
import ProductModel from "./Product";
import UserModel from "./User";
// import CommentModel from "./Comment";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  isAccept: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: () => Date.now(),
    immutable: false, // این مقدار باعث میشه دیگه تاریخ قابل دستکاری و تغییر نباشه
  },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  replyTo: {
    type: mongoose.Types.ObjectId,
    ref: "Comment",
  },
  sendBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

export default model;
