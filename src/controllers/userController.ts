import { UserType } from '../types/userType';
import { userStoreSchema } from './validate/userStoreValidate';
import { userUpdateSchema } from './validate/userUpdateValidate';
import { NextFunction, Request, Response } from "express";
import { createUser, updatePassword as updatePasswordUser} from '../services/userService';


export async function store(req: Request, res: Response) {
    const userData: UserType = req.body;
    const userParse = userStoreSchema.parse(userData);
    const user = await createUser(userParse as UserType);
    res.status(201).json(user);
}

export async function updatePassword(req: Request, res: Response) {
    const userData: UserType = req.body as UserType;
    const userParse = userUpdateSchema.parse(userData);
    const user = await updatePasswordUser(userParse);
    res.status(201).json(user);
}