const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: "Email is required",
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  username: {
    type: String,
    required: "Username is required",
    unique: true,
    match: [
      /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/,
      "Please fill a valid username",
    ],
  },
  club_id: {
    type: Number,
    required: "Club ID is required",
    unique: true,
  },
});

adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Admin", adminSchema);
