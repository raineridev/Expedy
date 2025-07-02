import { PasswordType } from "../controllers/validate/userUpdateValidate";
import { store, updatePassword as updatePasswordUser, getUserByUsername} from "../repositories/userRepository";
import { UserType } from "../types/userType";


export async function createUser(data: UserType) {

        return await store(data);
}

export async function updatePassword(data: PasswordType) {
        const { id, password } = data;
        return await updatePasswordUser(id, password)
}

export async function getUserUsername(username: string) {
        return await getUserByUsername(username);
}