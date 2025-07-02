import { authenticateUser } from '../services/authService';
import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const token = await authenticateUser(req.body);
    res.status(200).json({ token });
}