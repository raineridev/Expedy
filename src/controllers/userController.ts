import { UserType } from '../types/userType';
import { userStoreSchema } from './validate/userStoreValidate';
import { userUpdateSchema } from './validate/userUpdateValidate';
import { NextFunction, Request, Response } from "express";
import { createUser, updatePassword as updatePasswordUser} from '../services/userService';


export async function store(req: Request, res: Response) {
    const userCreationData: UserType = req.body;
    const validatedUserData = userStoreSchema.parse(userCreationData);
    const createdUser = await createUser(validatedUserData as UserType);
    res.status(201).json(createdUser);
}

export async function updatePassword(req: Request, res: Response) {
    const passwordUpdateData: UserType = req.body as UserType;
    const validatedPasswordData = userUpdateSchema.parse(passwordUpdateData);
    const updatedUser = await updatePasswordUser(validatedPasswordData);
    res.status(201).json(updatedUser);
}