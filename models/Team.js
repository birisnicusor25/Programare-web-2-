const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  players: { type: Number, required: true },
  category: { type: String, enum: ["Juniori","Seniori","Amatori"] },
  coach: { type: String, default: "Nespecificat" },
  active: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
},{ timestamps:true });

module.exports = mongoose.model("Team", schema);