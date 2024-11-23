import mongoose from "mongoose";
import CategoryModel from "@/models/Category"

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId:{
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

const model = mongoose.models.SubMenu || mongoose.model("SubMenu", schema);
export default model;
