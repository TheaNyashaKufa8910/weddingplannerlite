import express from 'express';
import { body } from 'express-validator';
import * as authCtrl from '../controllers/authController.js';

const router = express.Router();

router.post('/register',
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  authCtrl.register
);

router.post('/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  authCtrl.login
);

export default router;
