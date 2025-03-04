import express from "express";
import { addProduct } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Use Multer for file uploads
router.post("/add", upload.array("images", 5), addProduct);

export default router;
