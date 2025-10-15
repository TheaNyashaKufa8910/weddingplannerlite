import express from "express";
import {
  createWedding,
  getWeddings,
  getWeddingById,
  updateWedding,
  deleteWedding,
} from "../controllers/weddingController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

// Clerk middleware automatically validates sessions, no API key needed
router.post("/", requireAuth(), createWedding);
router.get("/", requireAuth(), getWeddings);
router.get("/:id", requireAuth(), getWeddingById);
router.put("/:id", requireAuth(), updateWedding);
router.delete("/:id", requireAuth(), deleteWedding);

export default router;
