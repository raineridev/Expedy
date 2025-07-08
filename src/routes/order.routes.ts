import { store, get, destroy, update, search} from "../controllers/order.controller";
import { Router } from "express";
import { auth } from "../middlewares/auth.middleware";
const app = Router();


app.get("/", auth, search);
app.post("/", auth, store);
app.get("/:id", auth, get);
app.delete("/:id", auth, destroy);
app.put("/:id", auth, update);


export default app;