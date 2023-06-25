import { Router } from 'express';
import userMiddleware from '../middleware/userMiddleware';
import { getAll, createBook, updateBook, destroyBook, getOne } from '../controllers/book';
import adminMiddleware from '../middleware/adminMiddleware';

const router = Router();

router.get('/all', userMiddleware, getAll);

router.get('/:id/one', userMiddleware, getOne);

router.post('/create', adminMiddleware, createBook);

router.patch('/:id/update', adminMiddleware, updateBook);

router.delete('/:id/destroy', adminMiddleware, destroyBook);

export default router;
