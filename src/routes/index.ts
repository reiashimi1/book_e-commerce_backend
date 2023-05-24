import { Router } from 'express';
import UserRoutes from './user';
import AddressRoutes from './address';

const router = Router();

router.use('/user', UserRoutes);
router.use('/user', AddressRoutes);

export default router;
