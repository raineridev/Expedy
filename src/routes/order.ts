import { store, get, destroy, update, search} from "../controllers/orderController";
import { Router } from "express";

const app = Router();

app.get("/", search);
app.post("/", store);
app.get("/:id", get);
app.delete("/:id", destroy);
app.put("/:id", update);

export default app;