import { store, updatePassword as updatePasswordUser} from "../repositories/userRepository";
import { UserType } from "../types/userType";

export async function createUser(data: UserType) {
        return await store(data);
}

export async function updatePassword(id: number, password: string) {
        return await updatePasswordUser(id, password)
}