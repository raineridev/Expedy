import { storeModel } from '../entities/store';
import { StoreType } from '../types/storeType';

export async function store(data: StoreType) {
    return await storeModel.create(data);
}

export async function getStoreById(id: Number)
 {
    const store = await storeModel.findOne({id: id});
    if (!store) {
        throw new Error('Store not found');
    }
    return store;
}

export async function deleteById(id: Number) {
    const store = await storeModel.findOneAndDelete({id: id});
    if (!store) {
        throw new Error('Store not found');
    }
    return store;
}

export async function update(id: Number, data: StoreType) {
    const store = await storeModel.findOneAndUpdate({id: id}, data);
    if (!store) {
        throw new Error('Store not found');
    }
    return store;
}