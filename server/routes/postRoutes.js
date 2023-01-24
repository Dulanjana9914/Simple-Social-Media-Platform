import express from "express";
import { getAllPosts, likePost } from "../controllers/posts.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

//Read all posts
router.get("/", authenticate, getAllPosts);

//Update like count
router.patch("/:id/like", authenticate, likePost);

export default router;