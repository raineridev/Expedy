import { Request, Response } from "express";
import { OrderType } from '../types/order.types'; 
import { OrderSearchType } from '../types/order-search.types';
import {  createOrder, getOrder, deleteOrder, updateOrder, searchOrder } from '../services/order.service';
import { setWorkbook, setWorksheet, setColumns, createSheet, setStyleColumns } from '../services/report.service';
import { sheetToUpperCase } from "../../utils/excel.util";

export async function store(req: Request, res: Response) {
    const orderData: OrderType = req.body;
    const order = await createOrder(orderData, parseInt(req.headers['x-user-id'] as string));
    res.status(201).json(order);
}

export async function get(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    const orderDetails = await getOrder(orderId);
    res.status(200).json(orderDetails);
}

export async function destroy(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    const deletedOrder = await deleteOrder(orderId);
    res.status(200).json();
}

export async function update(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    const orderUpdateData: OrderType = req.body;
    const updatedOrder = await updateOrder(orderId, orderUpdateData);
    res.status(200).json(updatedOrder);
}

export async function search(req: Request, res: Response) {
    const searchCriteria: OrderSearchType = req.query as unknown as OrderSearchType;
    const foundOrders = await searchOrder(searchCriteria);
    res.status(200).json(foundOrders);
}