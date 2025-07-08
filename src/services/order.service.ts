import {store, getOrderById, destory, update, getOrderBySearch} from '../repositories/order.repository';
import { OrderSearchType } from '../types/order-search.types';
import { OrderType } from '../types/order.types';
import { fetchUserById } from './user.service';


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