import {store , getStoreById, deleteById, update} from '../repositories/storeRepository';
import { StoreType } from '../types/storeType';
import { updateUser } from './userService';

export async function createStore(storeData: StoreType, ownerId: number) {
    const createdStoreData = await store(storeData);
    const updatedUserData = await updateUser(ownerId, { store: createdStoreData.id });
    
    return createdStoreData;
}

export async function getStore(storeId: number) {
    return await getStoreById(storeId);
}

export async function deleteStore(storeId: number) {
    return await deleteById(storeId);
}

export async function updateStore(storeId: number, storeUpdateData: StoreType) {
    return await update(storeId, storeUpdateData);
}
