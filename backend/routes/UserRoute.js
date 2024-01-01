import express from 'express';
import * as authController from '../controllers/auth/index.js';
import { checkUserExistence } from '../middlewares/checkUserExistence.js';

const router = express.Router();

router.post('/register', checkUserExistence, authController.register);

export default router;