import { storeModel } from '../entities/store';
import { StoreType } from '../types/storeType';

export async function store(data: StoreType) {
    return await storeModel.create(data);
}

export async function getStoreById(id: number)
 {
    const store = await storeModel.findOne({id: id});
    if (!store) {
        throw new Error('Store not found');
    }
    return store;
}

export async function deleteById(id: number) {
    const store = await storeModel.findOneAndDelete({id: id});
    if (!store) {
        throw new Error('Store not found');
    }
    return store;
}

export async function update(id: number, data: StoreType) {
    const store = await storeModel.findOneAndUpdate({id: id}, data);
    if (!store) {
        throw new Error('Store not found');
    }
    return store;
}