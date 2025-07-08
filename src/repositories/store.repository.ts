import { storeModel } from '../entities/store.entity';
import { StoreType } from '../types/store.types';

export async function store(storeData: StoreType) {
    return await storeModel.create(storeData);
}

export async function getStoreById(storeId: number) {
    const foundStore = await storeModel.findOne({id: storeId});
    if (!foundStore) {
        throw new Error('Store not found');
    }
    return foundStore;
}

export async function deleteById(storeId: number) {
    const deletedStore = await storeModel.findOneAndDelete({id: storeId});
    if (!deletedStore) {
        throw new Error('Store not found');
    }
    return deletedStore;
}

export async function update(storeId: number, storeUpdateData: StoreType) {
    const updatedStore = await storeModel.findOneAndUpdate({id: storeId}, storeUpdateData);
    if (!updatedStore) {
        throw new Error('Store not found');
    }
    return updatedStore;
}