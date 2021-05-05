const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
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
  password: {
    type: String,
    required: "Password is required",
  },
  role: {
    type: String,
    required: "Role is required",
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
