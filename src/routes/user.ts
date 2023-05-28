import { Router } from 'express';
import { loginUser, loginAdmin, registerUser, getCurrentUser } from '../controllers/user';
import userMiddleware from '../middleware/userMiddleware';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/login-admin', loginAdmin);

router.get('/:id/me', userMiddleware, getCurrentUser);

export default router;
