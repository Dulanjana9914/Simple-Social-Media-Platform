import express from "express";
import {getUser} from "../controllers/users.js";
import {verifyToken} from "../middleware/authenticate.js";

const router = express.Router();

//Routes
router.get("/:id", verifyToken, getUser);

export default router;
