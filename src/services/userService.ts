import { PasswordType } from "../controllers/validate/userUpdateValidate";
import { store, updatePassword as updatePasswordUser, getUserByUsername, getUserById, updateUser as updateUserRepository} from "../repositories/userRepository";
import { UserType } from "../types/userType";


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