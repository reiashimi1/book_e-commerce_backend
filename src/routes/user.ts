import { Router } from 'express';
import { getUsers, loginUser, registerUser } from '../controllers/user';
import userMiddleware from '../middleware/userMiddleware';

const router = Router();

router.post('/users/register', registerUser);

router.post('/login', loginUser);

// move the functions to the controllers directory
router.get('/', getUsers);

router.post('/', (req, res) => {
  res.send(req.body);
});

router.patch('/', (req, res) => {
  res.send(req.body);
});

router.delete('/', (req, res) => {
  res.send(req.body);
});

export default router;
