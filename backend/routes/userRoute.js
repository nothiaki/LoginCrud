import express from 'express';
import { checkUserExistence } from '../middlewares/checkUserExistence.js';
import * as authController from '../controllers/auth/index.js';
import * as userController from '../controllers/user/index.js';
import * as appController from '../controllers/app/index.js';

const router = express.Router();

router.get('/', appController.listAllUsers);
router.get('/:username', appController.listOneUser);

router.post('/auth/register', checkUserExistence, authController.register);
router.post('/auth/login', authController.login);

router.put('/update/:lastUsername', userController.update);

router.delete('/deleteUser/:username', userController.deleteUser);

export default router;