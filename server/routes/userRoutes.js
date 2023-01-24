import express from "express";
import {getUser} from "../controllers/users.js";
import {authenticate} from "../middleware/authenticate.js";

const router = express.Router();

//Routes
router.get("/:id", authenticate, getUser);

export default router;
