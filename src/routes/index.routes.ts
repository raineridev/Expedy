import { Router } from 'express';
import authRouter from './auth.routes';
import { auth } from "../middlewares/auth.middleware";
import userRouter from './user.routes';
import orderRouter from './order.routes';
import storeRouter from './store.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/store', auth, storeRouter);
router.use('/order', auth, orderRouter);
router.use('/auth', authRouter);

export default router;