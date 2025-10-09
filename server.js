import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import eventRoutes from './src/routes/eventRoutes.js';
import vendorRoutes from './src/routes/vendorRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import notFound from './src/middleware/notFound.js';
import errorHandler from './src/middleware/errorMiddleware.js';

// 1️⃣ Load environment variables
dotenv.config();

// 2️⃣ Initialize Express app
const app = express();

// 3️⃣ Middleware
app.use(express.json());

// 4️⃣ Connect to MongoDB
connectDB();

// 5️⃣ Routes
app.get('/', (req, res) => res.send('Wedding Planner Lite API is running...'));
app.use('/api/events', eventRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/auth', authRoutes);

// 6️⃣ 404 and error handlers (always at the end)
app.use(notFound);
app.use(errorHandler);

// 7️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

