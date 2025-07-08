import express from 'express';
import { store, updatePassword } from '../controllers/user.controller';

const app = express();

app.post('/', store);
app.patch('/', updatePassword);
export default app;