const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  status: { type: String, enum: ["pending","ongoing","completed"], default:"pending" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{ timestamps:true });

module.exports = mongoose.model("Task", schema);