import express from 'express';
import { checkUserExistence } from '../middlewares/checkUserExistence.js';
import * as authController from '../controllers/auth/index.js';
import * as userController from '../controllers/user/index.js';

const router = express.Router();

router.get('/', userController.listUsers);
router.get('/user/:username', userController.oneUser);

router.post('/auth/register', checkUserExistence, authController.register);
router.post('/auth/login', authController.login);

router.delete('/deleteUser/:username', userController.deleteUser);

export default router;