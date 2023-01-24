import Posts from "../models/postModel.js";
import User from "../models/userModel.js";
const date = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
const savedDate = date.toString();

//Add a post
export const addPost = async (req, res) => {
  try {
    const { userId, picture } = req.body;
      const user = await User.findById(userId);
    
      const newPost = new Posts({
      userId,
      username: user.username,
      picture,
      savedDate,
      likes: {}
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//Show All Posts
export const getAllPosts = async (req, res) => {
  try {
    const post = await Posts.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Update like count
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Posts.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

