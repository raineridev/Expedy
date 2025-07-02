import { Router } from 'express';
import auth from './auth';
import userRouter from './users';
import orderRouter from './order';
import storeRouter from './store';

const router = Router();

router.use('/users', userRouter);
router.use('/store', storeRouter);
router.use('/order', orderRouter);
router.use('/auth', auth);

export default router;