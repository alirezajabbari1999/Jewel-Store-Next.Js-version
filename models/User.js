import mongoose from "mongoose";

const schema = mongoose.Schema({
  username: {
    type: "String",
    required: true,
  },
  email: {
    type: "String",
    required: true,
  },
  phone: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
  },
  image:{
    type: "String",
    required: false
  },
  role: {
    type: String,
    default: "USER",
  }
});

const model = mongoose.models.User || mongoose.model("User", schema);
export default model;
