const express = require("express");
const router = express.Router();

const multer = require("multer");

const Post = require("../Models/Post");
const User = require("../Models/User");
const verifyToken = require("../verifyToken");


// =======================
// Multer Configuration
// =======================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage
});


// =======================
// CREATE POST
// =======================

router.post(
  "/create",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {

      let parsedCategories = [];

      try {
        parsedCategories = req.body.categories
          ? JSON.parse(req.body.categories)
          : [];
      } catch {
        parsedCategories = [];
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        username: user.username,
        userId: user._id,
        categories: parsedCategories,
        photo: req.file ? req.file.filename : ""
      });

      const savedPost = await newPost.save();

      res.status(200).json(savedPost);

    } catch (err) {
  console.log("CREATE POST ERROR:");
  console.log(err);

  res.status(500).json({
    error: err.message
  });
}
  }
);


// =======================
// GET ALL POSTS
// =======================

router.get("/", async (req, res) => {
  try {

    const query = req.query;

    const searchFilter = {
      title: {
        $regex: query.search || "",
        $options: "i"
      }
    };

    const posts = await Post.find(
      query.search ? searchFilter : {}
    );

    res.status(200).json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
});


// =======================
// GET POSTS OF A USER
// =======================

router.get("/user/:userId", async (req, res) => {
  try {

    const posts = await Post.find({
      userId: req.params.userId
    });

    res.status(200).json(posts);

  } catch (err) {
    res.status(500).json(err);
  }
});


// =======================
// GET SINGLE POST
// =======================

router.get("/:id", async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json(post);

  } catch (err) {
    res.status(500).json(err);
  }
});


// =======================
// UPDATE POST
// =======================

router.put("/:id", verifyToken, async (req, res) => {
  try {

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedPost);

  } catch (err) {
    res.status(500).json(err);
  }
});


// =======================
// DELETE POST
// =======================

router.delete("/:id", verifyToken, async (req, res) => {
  try {

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;