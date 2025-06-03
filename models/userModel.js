const mongoose = require("mongoose");

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
        enum: ["click", "watch", "add_to_watchlist", "remove_from_watchlist"],
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