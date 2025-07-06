import {store , getStoreById, deleteById, update} from '../repositories/storeRepository';
import { StoreType } from '../types/storeType';
import { updateUser } from './userService';

export async function createStore(data: StoreType, userId: number) {
    const storeData = await store(data);
    const userData =  await updateUser(userId, { store: storeData.id });
    
    return storeData;
}

export async function getStore(id: number) {
    return await getStoreById(id);
}

export async function deleteStore(id: number) {
    return await deleteById(id);
}

export async function updateStore(id: number, data: StoreType) {
    return await update(id, data);
}
