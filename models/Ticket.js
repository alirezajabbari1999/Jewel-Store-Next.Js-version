const mongoose = require("mongoose");
require("./Department");
require("./SubDepartment");
require("./User");
require("./Ticket");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    subDepartment: {
      type: mongoose.Types.ObjectId,
      ref: "subDepartment",
      required: true,
    },
    // آیا تیکت جوابی داره؟
    hasAnswer: {
      type: Boolean,
      default: false,
    },
    // آیا تیکت یک تیکت جوابه؟
    isAnswer: {
      type: Boolean,
      default: false,
    },
    // در این مدل آی دی تیکتی که جواب داده شده قرار میگیره
    mainTicket: {
      type: mongoose.Types.ObjectId,
      ref: "Ticket",
      required: false,
    },
    // سطح اولویت
    priority: {
      type: Number,
      default: 1,
      enum: [1, 2, 3], // فقط اعداد 1-2-3 قبوله
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

export default model;
