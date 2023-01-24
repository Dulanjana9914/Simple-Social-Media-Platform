import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    picture: String,
    savedDate: {
        type: String,
        required: true,
    },
    likes: {
      type: Map,
      of: Boolean,
    }
  },
  { timestamps: true }
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;
