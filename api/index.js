import express from "express";
import mongoose from "mongoose";
import { getTranscript } from "./lib/yt.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log("Connected to database!");
  });

app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Hello, World");
});

app.listen(5000, () => console.log("Running Sucessfully!"));
