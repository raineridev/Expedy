import { PasswordType } from "../controllers/validators/user-update.validator";
import { store, updatePassword as updatePasswordUser, getUserByUsername, getUserById, updateUser as updateUserRepository} from "../repositories/user.repository";
import { UserType } from "../types/user.types";


export async function createUser(userData: UserType) {
    return await store(userData);
}

export async function updatePassword(passwordUpdateData: PasswordType) {
    const { id: userId, password: newPassword } = passwordUpdateData;
    return await updatePasswordUser(userId, newPassword);
}

export async function getUserUsername(requestedUsername: string) {
    return (await getUserByUsername(requestedUsername)).toObject();
}

export async function fetchUserById(userId: number) { 
    return (await getUserById(userId)).toObject();
}

export async function updateUser(userId: number, userUpdateData: Object) {
    return await updateUserRepository(userId, userUpdateData);
}