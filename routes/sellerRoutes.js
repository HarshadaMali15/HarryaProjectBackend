// routes/sellerRoutes.js
import express from "express";
import { registerSeller, loginSeller, logoutSeller, checkAuth } from "../controllers/sellerController.js";

const router = express.Router();
router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.post("/logout", logoutSeller);
router.get("/check-auth", checkAuth);
router.get("/protected-route", checkAuth, (req, res) => {
  res.json({ message: "Access granted" });
});

export default router;
