// routes/sellerRoutes.js
import express from "express";
import {getSellerProfile, registerSeller, loginSeller, logoutSeller, checkAuth } from "../controllers/sellerController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Add authentication middleware 

const router = express.Router();
router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);
router.get("/check-auth", checkAuth);
router.get("/profile", protect, getSellerProfile);

router.get("/protected-route", checkAuth, (req, res) => {
  res.json({ message: "Access granted" });
  
});

export default router;



