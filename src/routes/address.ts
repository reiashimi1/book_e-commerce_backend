import { Router } from 'express';
import userMiddleware from '../middleware/userMiddleware';
import { createAddress, destroyAddress, getAll } from '../controllers/address';

const router = Router();

router.get('/:id/addresses', userMiddleware, getAll);

// router.get('/', getUsers);

router.post('/:id/addresses', userMiddleware, createAddress);

// router.patch('/', (req, res) => {
//   res.send(req.body);
// });

router.delete('/:id/addresses/:addressId', userMiddleware, destroyAddress);

export default router;
