import { store, update, destroy, get} from "../controllers/storeController";
import { auth } from "../middlewares/auth";
import express from 'express';

const app = express();

app.post('/', store);
app.get('/:id', get);
app.delete('/:id', destroy);
app.patch('/:id', update);

export default app;