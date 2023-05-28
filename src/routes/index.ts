import { Router } from 'express';
import UserRoutes from './user';
import AddressRoutes from './address';
import OrderRoutes from './order';
import BookRoutes from './book';

const router = Router();

router.use('/users', UserRoutes);
router.use('/', AddressRoutes);
router.use('/', OrderRoutes);
router.use('/books', BookRoutes);

export default router;
