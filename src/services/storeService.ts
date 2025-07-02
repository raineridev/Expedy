import {store , getStoreById, deleteById, update} from '../repositories/storeRepository';
import { StoreType } from '../types/storeType';

export async function createStore(data: StoreType) {
    return await store(data);
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
