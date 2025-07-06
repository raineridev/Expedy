import { createStore, getStore, deleteStore, updateStore } from '../services/storeService';
import { Request, Response } from 'express';

export async function store(req: Request, res: Response) {
    try {
        const data = req.body;
        const store = await createStore(data, parseInt(req.headers['x-user-id'] as string));
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ error: 'Error creating store' });
    }
}

export async function get(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const store = await getStore(id);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching store' });
    }
}

export async function destroy(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const store = await deleteStore(id);
        res.status(200).json();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting store' });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const store = await updateStore(id, data);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ error: 'Error updating store' });
    }
}