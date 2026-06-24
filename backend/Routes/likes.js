const express = require("express");
const router = express.Router();

const Like = require("../Models/Like");
const verifyToken = require("../verifyToken");


// =====================
// Toggle Like / Unlike
// =====================
router.post("/toggle/:postId", verifyToken, async (req, res) => {
  try {

    const existingLike = await Like.findOne({
      postId: req.params.postId,
      userId: req.user.id
    });

    // User already liked → unlike
    if (existingLike) {

      await Like.findByIdAndDelete(existingLike._id);

      return res.status(200).json({
        liked: false,
        message: "Post unliked"
      });
    }

    // User hasn't liked → like
    const newLike = new Like({
      postId: req.params.postId,
      userId: req.user.id
    });

    await newLike.save();

    res.status(200).json({
      liked: true,
      message: "Post liked"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// =====================
// Get Like Count
// =====================
router.get("/:postId", async (req, res) => {
  try {

    const count = await Like.countDocuments({
      postId: req.params.postId
    });

    res.status(200).json({
      count
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


// =====================
// Check Current User Like Status
// =====================
router.get("/status/:postId", verifyToken, async (req, res) => {
  try {

    const existingLike = await Like.findOne({
      postId: req.params.postId,
      userId: req.user.id
    });

    res.status(200).json({
      liked: !!existingLike
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;