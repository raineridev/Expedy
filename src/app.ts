import express from 'express';
import router from './routes/index.routes';
import { auth } from './middlewares/auth.middleware';
const app = express();

app.use(express.json());
app.use(router)

export default app;