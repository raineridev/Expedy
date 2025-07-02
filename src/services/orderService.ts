import {store, getOrderById, destory, update, getOrderBySearch} from '../repositories/orderRepository';
import { OrderSearchType } from '../types/orderSearchType';
import { OrderType } from '../types/orderType';

export async function createOrder(data: OrderType) {
    return await store(data);
}

export async function getOrder(id: number) {
    return await getOrderById(id);
}

export async function deleteOrder(id: number) {
    return await destory(id);
}

export async function updateOrder(id: number, data: OrderType) {
    return await update(id, data);
}

export async function searchOrder(query: OrderSearchType) {
    return await getOrderBySearch(query);
}