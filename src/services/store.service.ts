import {store , getStoreById, deleteById, update} from '../repositories/store.repository';
import { StoreType } from '../types/store.types';
import { updateUser } from './user.service';

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
