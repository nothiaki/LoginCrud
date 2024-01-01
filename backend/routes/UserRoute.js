import express from 'express';
import * as authController from '../controllers/auth/index.js';
import { checkUserExistence } from '../middlewares/checkUserExistence.js';

const router = express.Router();

router.post('/register', checkUserExistence, authController.register);
router.post('/login', authController.login);
router.post('/remove', authController.remove);

export default router;