const express = require("express");
const router = express.Router();

const Comment = require("../Models/Comment");
const User = require("../Models/User");
const verifyToken = require("../verifyToken");


// ================= CREATE COMMENT =================

router.post("/create", verifyToken, async (req, res) => {
  try {

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

const newComment = new Comment({
  comment: req.body.comment,
  postId: req.body.postId,
  author: user.username,
  userId: user._id
});

    const savedComment = await newComment.save();

    res.status(200).json(savedComment);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ================= UPDATE COMMENT =================

router.put("/:id", verifyToken, async (req, res) => {
  try {

    const existingComment = await Comment.findById(req.params.id);

    if (!existingComment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (existingComment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can edit only your own comments"
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          comment: req.body.comment
        }
      },
      { new: true }
    );

    res.status(200).json(updatedComment);

  } catch (err) {
    res.status(500).json(err);
  }
});


// ================= DELETE COMMENT =================

router.delete("/:id", verifyToken, async (req, res) => {
  try {

    const existingComment = await Comment.findById(req.params.id);

    if (!existingComment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (existingComment.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can delete only your own comments"
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Comment deleted successfully"
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


// ================= GET COMMENTS OF A POST =================

router.get("/post/:postId", async (req, res) => {
  try {

    const comments = await Comment.find({
      postId: req.params.postId
    }).sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;