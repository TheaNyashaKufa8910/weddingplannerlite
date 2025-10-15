import express from "express";
import dotenv from "dotenv";
import { requireAuth } from "@clerk/express"; // ✅ latest SDK
import mongoose from "mongoose";
import weddingRoutes from "./routes/weddingRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Example protected route
app.get("/protected", requireAuth(), (req, res) => {
  res.send(`Hello ${req.auth.userId}, you are authenticated!`);
});

// Use wedding routes (all protected inside routes)
// app.use("/api/weddings", weddingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


