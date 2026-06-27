const express = require("express");
const router = express.Router();

const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =====================
// REGISTER
// =====================

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const { password: pwd, ...userInfo } =
      savedUser._doc;

    res.status(201).json(userInfo);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
});


// =====================
// LOGIN
// =====================

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...info } = user._doc;

    res
      .cookie("token", token, {
       httpOnly: true,
       secure: true,
       sameSite: "none",
       maxAge: 3 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json(info);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
});


// =====================
// LOGOUT
// =====================

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
});


// =====================
// REFRESH USER
// =====================

router.get("/refresh", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    jwt.verify(
      token,
      process.env.SECRET,
      async (err, data) => {
        if (err) {
          return res.status(403).json({
            message: "Invalid token",
          });
        }

        const user =
          await User.findById(data.id).select(
            "-password"
          );

        if (!user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.status(200).json(user);
      }
    );

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Refresh failed",
      error: err.message,
    });
  }
});

module.exports = router;