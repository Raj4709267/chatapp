const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        res.status(404).json({ message: "Please login again" });
      } else {
        req.body._id = decoded.userId;
        next();
      }
    });
  } else {
    res.status(404).json({ message: "Please login" });
  }
};

module.exports = { authentication };
