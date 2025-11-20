import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    link: String,
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
