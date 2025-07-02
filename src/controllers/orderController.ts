import { Request, Response } from "express";
import { OrderType } from '../types/orderType'; 
import { OrderSearchType } from '../types/orderSearchType';
import {  createOrder, getOrder, deleteOrder, updateOrder, searchOrder } from '../services/orderService';

export async function store(req: Request, res: Response) {
    const orderData: OrderType = req.body;
    const order = await createOrder(orderData);
    res.status(201).json(order);
}

export async function get(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const order = await getOrder(id);
    res.status(200).json(order);
}

export async function destroy(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const order = await deleteOrder(id);
    res.status(200).json();
}

export async function update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const orderData: OrderType = req.body;
    const order = await updateOrder(id, orderData);
    res.status(200).json(order);
}

export async function search(req: Request, res: Response) {
    const queryData: OrderSearchType = req.query as unknown as OrderSearchType;
    const order = await searchOrder(queryData);
    res.status(200).json(order);
}