import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    const token = header.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'devsecret';
    const decoded = jwt.verify(token, secret); // throws if invalid

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ success: false, message: 'User not found' });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    next(err); // central error handler will process
  }
};
