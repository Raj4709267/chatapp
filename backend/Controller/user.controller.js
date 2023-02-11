const { UserModel } = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const userSignup = async (req, res) => {
  const payload = req.body;
  console.log(payload);
  let isUserPresent = await UserModel.findOne({ email: payload.email });

  if (isUserPresent) {
    res
      .status(404)
      .json({ message: "User with same email id is already signed up" });
  } else {
    bcrypt.hash(payload.password, 5, async function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res
          .status(404)
          .json({ message: "Something went wrong. Try again later" });
      } else {
        await UserModel.insertMany([{ ...payload, password: hash }]);
        res.send({ message: "Signup successfull" });
      }
    });
  }
};

const userLogin = async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const user = await UserModel.findOne({ email: payload.email });
  console.log(user);
  if (!user) {
    res.status(404).json({ message: "Wrong credentials" });
  } else {
    bcrypt.compare(payload.password, user.password, function (err, result) {
      // result == true
      if (result) {
        jwt.sign(
          { userId: user._id },
          process.env.PRIVATE_KEY,
          function (err, token) {
            if (err) {
              res
                .status(404)
                .json({ message: "Something went wrong. Try again later" });
            } else {
              console.log(user);
              res.send({ token: token, name: user.name, user: user.email,role:user.role });
            }
          }
        );
      } else if (err) {
        res
          .status(404)
          .json({ message: "Something went wrong. Try again later" });
      } else {
        res.status(404).json({ message: "Wrong credentials" });
      }
    });
  }
};


module.exports = { userSignup, userLogin };
