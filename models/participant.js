const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const participantSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: true,
      match: [
        /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
        "Please fill a valid username",
      ],
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    startingpoint: {
      type: Number,
      required: "Startingpoint is required",
    },
    currentCase: Number,
    flagsRemaining: {
      type: Number,
      required: "FlagsRemaining is required",
    },
    score: {
      type: Number,
      default: 0,
    },
    arsenal: {
      type: Array,
      default: [
        { id: "q", name: "Queen", number: 1 },
        { id: "b", name: "Bishop", number: 2 },
        { id: "n", name: "Knight", number: 2 },
        { id: "r", name: "Rook", number: 2 },
      ],
    },
    pendingAuthorization: {
      type: Boolean,
      default: true,
    },
  },
  { strict: false }
);

participantSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Participant", participantSchema);
