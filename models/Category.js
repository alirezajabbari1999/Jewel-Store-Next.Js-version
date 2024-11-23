import mongoose from "mongoose";
import SubMenu from "./SubMenu";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subMenu: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubMenu",
      },
    ],
  },
});

const model = mongoose.models.Category || mongoose.model("Category", schema);
export default model;
