const { response } = require("express");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "user already exist" });
    }

    //create user
    user = new User(req.body);

    //hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save();

    //create and sign jwt
    const payload = {
      user: {
        id: user.id,
      },
    };
    //sign jwt
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );

    //confirmation msg
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

exports.getUsers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const users = await User.find().limit(20).select("-password, -email");
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

exports.getSingleUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.params.id).select("-password, -email");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};

exports.deleteUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "404 not found" });
    }

    await User.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "User deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
};
