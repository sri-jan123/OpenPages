const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  // console.log("Cookies:", req.cookies);

  const token = req.cookies.token;

  // console.log("Token:", token);

  if (!token) {
    return res.status(401).json("You are not authenticated");
  }

  jwt.verify(token, process.env.SECRET, (err, data) => {

    if (err) {
      console.log("JWT Error:", err);
      return res.status(403).json("Token is not valid");
    }

    req.user = data;
    next();
  });
};

module.exports = verifyToken;