import mongoose from "mongoose";

const weddingSchema = new mongoose.Schema({
  user: { type: String, required: true }, // Clerk userId
  coupleName: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  guests: [
    {
      name: String,
      email: String,
    },
  ],
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Wedding", weddingSchema);

