const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true
    },

    userId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// Prevent duplicate likes from same user
LikeSchema.index(
  { postId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Like", LikeSchema);