const mongoose = require("mongoose");

const participantClubSchema = mongoose.Schema({
  club_id: {
    type: Number,
    required: "Club ID is required",
  },
  participant_id: {
    type: String,
    ref: "Participant",
    required: "Participant ID is required",
  },
  piece: {
    type: String,
    required: "Piece is required",
  },
  handled: {
    type: Boolean,
    default: false
  },
  result: {
    type: Number
  }
},
{timestamps: true}
);

module.exports = mongoose.model("ParticipantClub", participantClubSchema);
