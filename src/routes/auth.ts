import { create } from "../controllers/authController";
import { Router } from "express";

const app = Router();

app.post("/", create);

export default app;