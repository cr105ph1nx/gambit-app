const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const clubSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: "ID is required",
  },
  position: {
    type: String,
    required: "Position is required",
    unique: true,
    match: [/^[a-h][1-8]$/, "Please fill a valid position"],
  },
  name: {
    type: String,
    required: "Name is required",
    unique: true,
  },
  logo: {
    type: String,
    required: "Logo Url is required",
  },
  description: {
    type: String,
    required: "Description is required",
  },
});

clubSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Club", clubSchema);
