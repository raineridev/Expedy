import { authenticateUser } from '../services/authService';
import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
    const authenticatedTokens = await authenticateUser(req.body);
    res.status(200).json({ tokens: authenticatedTokens });
}