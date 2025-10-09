import express from 'express';
import { getEvents, addEvent } from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router(); // <-- must declare first

// Routes
router.route('/')
  .get(protect, getEvents)   // GET all events (protected)
  .post(protect, addEvent);  // POST new event (protected)

export default router;

