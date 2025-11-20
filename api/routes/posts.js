import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.js";
import User from "../models/User.js";
import { getTranscript } from "../lib/yt.js";
import { getPostContent } from "../lib/gemini.js";
import Post from "../models/Post.js";

const app = Router();

app.post("/create", authenticateToken, async (req, res) => {
  const userId = req.user;

  const user = await User.findOne({ _id: userId._id });

  const { ytURL } = req.body;

  const transcript = await getTranscript(ytURL);

  const blogContent = await getPostContent(transcript);

  const post = await Post.create({
    title: blogContent.split("\n")[0].replace("#", "").trim(),
    content: blogContent,
    link: ytURL,
  });

  await User.findByIdAndUpdate(req.user.id, {
    $push: { posts: post._id },
  });
  return res.json({
    msg: "Blog generated successfully!",
    postId: post._id,
    blog: blogContent,
  });
});

app.delete("/delete", authenticateToken, async (req, res) => {
  const postId = req.params.id;

  await User.findByIdAndUpdate(req.user.id, {
    $pull: { posts: postId },
  });

  await Post.findByIdAndDelete(postId);

  return res.json({ msg: "Post deleted" });
});

export default app;
