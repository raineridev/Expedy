import { Router } from 'express';
import authRouter from './auth.routes';
import { auth } from "../middlewares/auth.middleware";
import userRouter from './user.routes';
import orderRouter from './order.routes';
import storeRouter from './store.routes';
import { getOrderReportData } from "../repositories/order-report.repository";

const router = Router();

router.use('/users', userRouter);
router.use('/store', auth, storeRouter);
router.use('/order', auth, orderRouter);
router.use('/auth', authRouter);

router.get("/report", getOrderReportData);

export default router;