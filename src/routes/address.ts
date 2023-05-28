import { Router } from 'express';
import userMiddleware from '../middleware/userMiddleware';
import {
  getUserAddresses,
  createAddress,
  destroyAddress,
  updateAddress
} from '../controllers/address';

const router = Router();

router.get('/users/:id/addresses', userMiddleware, getUserAddresses);

router.post('/users/:id/addresses/create', userMiddleware, createAddress);

router.patch('/addresses/:id/update', userMiddleware, updateAddress);

router.delete('/addresses/:id/destroy', userMiddleware, destroyAddress);

export default router;
