import express, { Request, Response } from 'express';
import { store, updatePassword } from '../controllers/userController';

const app = express();

app.post('/', store);

export default app;