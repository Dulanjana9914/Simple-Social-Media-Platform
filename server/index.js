import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

//Configure
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//Store images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); //set assests folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//Mongoose connection
const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`MongoDB connected on Port: ${PORT}`));
   })
.catch((error) => console.log("MongoDB connection Failed...", error.message));