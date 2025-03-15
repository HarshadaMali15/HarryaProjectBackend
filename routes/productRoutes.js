import express from "express";
import { addProduct,getProductById,getProducts } from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Use Multer for file uploads
router.post("/add", upload.array("images", 5), addProduct);

router.get("/", getProducts);
router.get("/:productId", getProductById);

export default router;
