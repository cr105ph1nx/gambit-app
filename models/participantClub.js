const mongoose = require("mongoose");

const participantClubSchema = mongoose.Schema({
    club_id: {
        type: Number,
        required: "Club ID is required"
    },
    participant_id: {
        type: Number,
        required: "Participant ID is required"
    },
    piece: {
        type: String,
        required: "Piece is required"
    }
})

module.exports = mongoose.model('ParticipantClub', participantClubSchema)