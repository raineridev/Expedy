import { Router } from 'express';
import authRouter from './auth';
import { auth } from "../middlewares/auth";
import userRouter from './users';
import orderRouter from './order';
import storeRouter from './store';

const router = Router();

router.use('/users', userRouter);
router.use('/store', auth, storeRouter);
router.use('/order', auth, orderRouter);
router.use('/auth', authRouter);

export default router;