import {store, getOrderById, destory, update, getOrderBySearch} from '../repositories/orderRepository';
import { OrderSearchType } from '../types/orderSearchType';
import { OrderType } from '../types/orderType';
import { fetchUserById } from './userService';


export async function createOrder(orderData: OrderType, requestingUserId: number) {
    console.log('Creating order with data:', orderData);
    const userDetails = await fetchUserById(requestingUserId); 
    if(userDetails.store === undefined) {
        throw new Error('User does not have a store associated');
    }
    orderData.store = userDetails.store;
    return await store(orderData);
}

export async function getOrder(orderId: number) {
    return await getOrderById(orderId);
}

export async function deleteOrder(orderId: number) {
    return await destory(orderId);
}

export async function updateOrder(orderId: number, orderUpdateData: OrderType) {
    return await update(orderId, orderUpdateData);
}

export async function searchOrder(searchQuery: OrderSearchType) {
    return await getOrderBySearch(searchQuery);
}