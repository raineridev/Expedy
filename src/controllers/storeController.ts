import { createStore, getStore, deleteStore, updateStore } from '../services/storeService';
import { Request, Response } from 'express';

export async function store(req: Request, res: Response) {
    try {
        const storeData = req.body;
        const userId = parseInt(req.headers['x-user-id'] as string);
        const createdStore = await createStore(storeData, userId);
        res.status(201).json(createdStore);
    } catch (error) {
        res.status(500).json({ error: 'Error creating store' });
    }
}

export async function get(req: Request, res: Response) {
    try {
        const storeId = parseInt(req.params.id);
        const storeDetails = await getStore(storeId);
        res.status(200).json(storeDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching store' });
    }
}

export async function destroy(req: Request, res: Response) {
    try {
        const storeId = parseInt(req.params.id);
        const deletedStore = await deleteStore(storeId);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting store' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const storeId = parseInt(req.params.id);
        const storeUpdateData = req.body;
        const updatedStore = await updateStore(storeId, storeUpdateData);
        res.status(200).json(updatedStore);
    } catch (error) {
        res.status(500).json({ error: 'Error updating store' });
    }
}