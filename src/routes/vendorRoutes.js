import express from 'express';
import { body } from 'express-validator';
import * as vendorCtrl from '../controllers/vendorController.js';
import { protect } from '../middleware/authMiddleware.js'; // we'll add auth middleware soon (optional protection)

const router = express.Router();

// validation rules for creating vendor
const vendorValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('email').optional().isEmail().withMessage('Invalid email'),
];

router.get('/', vendorCtrl.listVendors);
router.post('/', vendorValidation, protect, vendorCtrl.createVendor); // protected creation (requires auth)
router.get('/:id', vendorCtrl.getVendor);
router.put('/:id', vendorCtrl.updateVendor);
router.delete('/:id', vendorCtrl.deleteVendor);

export default router;
