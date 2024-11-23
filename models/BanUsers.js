import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    email: {
      type: "String",
      required: false,
    },
    phone: {
      type: "String",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.BanUsers || mongoose.model("BanUsers", schema);
export default model;
