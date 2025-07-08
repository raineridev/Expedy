import { create } from "../controllers/auth.controller";
import { Router } from "express";

const app = Router();

app.post("/", create);

export default app;