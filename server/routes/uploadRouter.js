import express from "express";
const router = express.Router();
import {verifyToken} from '../middleware/authenticate.js'
import uploadCtrl from "../controllers/uploadCtrl.js";

// Upload image
//router.post("/upload", verifyToken,uploadCtrl.upload);

// Delete image
router.post("/destroy", uploadCtrl.destroy);

export default router;
