import { Router } from 'express';
import { loginUser, registerUser, getCurrentUser } from '../controllers/user';
import userMiddleware from '../middleware/userMiddleware';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/:id/me', userMiddleware, getCurrentUser);

// router.get('/', getUsers);
//
// router.post('/', (req, res) => {
//   res.send(req.body);
// });
//
// router.patch('/', (req, res) => {
//   res.send(req.body);
// });
//
// router.delete('/', (req, res) => {
//   res.send(req.body);
// });

export default router;
