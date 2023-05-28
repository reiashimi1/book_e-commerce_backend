import { Router } from 'express';
import userMiddleware from '../middleware/userMiddleware';
import { getAll, createBook, updateBook, destroyBook } from '../controllers/book';
import adminMiddleware from '../middleware/adminMiddleware';

const router = Router();

router.get('/all', userMiddleware, getAll);

router.post('/:id/create', adminMiddleware, createBook);

router.patch('/:id/update', adminMiddleware, updateBook);

router.delete('/:id/destroy', adminMiddleware, destroyBook);

export default router;
