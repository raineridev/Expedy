import { orderModel } from '../entities/order.entity';
import { OrderSearchType } from '../types/order-search.types';
import { OrderType } from '../types/order.types';

export async function store(orderData: OrderType) {
    return await orderModel.create(orderData);
}

export async function getOrderById(orderId: number) {
    const foundOrder = await orderModel.findOne({ id: orderId });
    if (!foundOrder) {
        throw new Error('Order not found');
    }
    return foundOrder;
}

export async function destory(orderId: number) {
    const deletedOrder = await orderModel.findOneAndDelete({ id: orderId });
    if (!deletedOrder) {
        throw new Error('Order not found');
    }
    return deletedOrder;
}

export async function update(orderId: number, orderUpdateData: OrderType) {
    const updatedOrder = await orderModel.findOneAndUpdate({ id: orderId }, orderUpdateData, { new: true });
    if (!updatedOrder) {
        throw new Error('Order not found');
    }
    return updatedOrder;
} 

export async function getOrderBySearch(searchQuery: OrderSearchType) {
  const queryFilters: Record<string, any> = {};
  const availableOrderFilters: Record<string, any> = {
    period: { tag: 'dateOfSale', type: Date },
    status: { tag: 'status', type: String },
    pointSale: { tag: 'pointSale', type: String },
  };
  
  Object.keys(searchQuery).forEach((filterKey) => {
    if (filterKey == 'startPeriod') {
        queryFilters.dateOfSale = {}
        queryFilters.dateOfSale.$gte = new Date(searchQuery[filterKey]);
    } 
    if (filterKey == 'endPeriod') {
        queryFilters.dateOfSale.$lte = new Date(searchQuery[filterKey]);
    } 
    if (filterKey === 'status') {
        const { tag } = availableOrderFilters[filterKey];
        queryFilters[tag] = searchQuery[filterKey];
    }
    if (filterKey == 'pointSale') {
        const { tag } = availableOrderFilters[filterKey];
        queryFilters[tag] = searchQuery[filterKey];
    }
  });
  
    if(Object.keys(queryFilters).length == 0) { 
        return await orderModel.find({});
    }
    return await orderModel.find(queryFilters);
}