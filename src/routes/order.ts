import { Router } from 'express';
import userMiddleware from '../middleware/userMiddleware';
import {
  getUserOrders,
  getAll,
  createOrder,
  updateOrderStatus,
  destroyOrder
} from '../controllers/order';
import adminMiddleware from '../middleware/adminMiddleware';

const router = Router();

router.get('/users/:id/orders', userMiddleware, getUserOrders);

router.post('/users/:id/orders/create', userMiddleware, createOrder);

router.get('/orders/all', adminMiddleware, getAll);

router.patch('/orders/:id/update', adminMiddleware, updateOrderStatus);

router.delete('/orders/:id/destroy', userMiddleware, destroyOrder);

export default router;
