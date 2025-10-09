import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  serviceType: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  bio: { type: String },
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);
