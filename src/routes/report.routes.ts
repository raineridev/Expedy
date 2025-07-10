import { Router } from 'express';
import { getOrderReport } from '../controllers/report.controller';
import { auth } from '../middlewares/auth.middleware';

const reportRouter = Router();


reportRouter.get('/orders', getOrderReport);

export default reportRouter;
