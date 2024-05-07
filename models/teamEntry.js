const mongoose = require("mongoose");

const teamEntrySchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  players: { type:Array,default:[],required: true },
  captain: { type: String, required: true },
  viceCaptain: { type: String, required: true },
  totalPoints: { type: Number, default: 0 },
});

const TeamEntry = mongoose.model("TeamEntry", teamEntrySchema);

module.exports = TeamEntry;
