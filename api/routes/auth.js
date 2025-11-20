import { Router } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = Router();

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "No name/email/password" });
  }

  const userExists = await User.findOne({ email });

  if (userExists) return res.status(400).json({ msg: "User Already Exists!" });

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    posts: [],
  });

  const u = await newUser.save();

  const token = jwt.sign({ id: u._id }, "SECRET_123");

  return res.json({
    msg: "Sucessfully Registered",
    token,
    user: userExists,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "No email/password" });
  }

  const userExists = await User.findOne({ email });

  if (!userExists)
    return res.status(400).json({ msg: "User Does Not Exists!" });

  if (!bcrypt.compareSync(password, userExists.password)) {
    return res.status(400).json("Wrong Credentials!");
  }

  const token = jwt.sign({ id: userExists._id }, "SECRET_123");

  return res.json({
    msg: "Sucessfully Registered",
    token,
    user: userExists,
  });
});

export default app;
