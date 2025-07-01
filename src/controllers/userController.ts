import { UserType } from '../types/userType';
import { NextFunction, Request, Response } from "express";
import { createUser, updatePassword as updatePasswordUser} from '../services/userService';

export async function store(req: Request, res: Response, next: NextFunction) {
    const user = await createUser(req.body);
    return res.json(user);
}

export function updatePassword(id: number, password: string) {
    return updatePasswordUser(id, password);
}