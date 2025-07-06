import { PasswordType } from "../controllers/validate/userUpdateValidate";
import { store, updatePassword as updatePasswordUser, getUserByUsername, getUserById, updateUser as updateUserRepository} from "../repositories/userRepository";
import { UserType } from "../types/userType";


export async function createUser(data: UserType) {

        return await store(data);
}

export async function updatePassword(data: PasswordType) {
        const { id, password } = data;
        return await updatePasswordUser(id, password)
}

export async function getUserUsername(username: string) {
        return (await getUserByUsername(username)).toObject();
}

export async function fetchUserById(id: number) { 
        return (await getUserById(id)).toObject();
}

export async function updateUser(id: number, data: Object) {
        return await updateUserRepository(id, data);
}