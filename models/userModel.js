const mongoose = require("mongoose");
const { Action } = require("../common/appConstants");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tracking: [
    {
      movie_id: {
        type: String,
        required: true,
      },
      action: {
        type: String,
        enum: Object.values(Action),
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      genres: [Number],
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);