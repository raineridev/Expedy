import orderModel from '../entities/order';
import { OrderSearchType } from '../types/orderSearchType';
import { OrderType } from '../types/orderType';

export async function store(data: OrderType) {
    return await orderModel.create(data);
}

export async function getOrderById(id: number) {
    const order = await orderModel.findOne({ id: id });
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
}

export async function destory(id: number) {
    const order = await orderModel.findOneAndDelete({ id: id });
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
    
}

export async function update(id: number, data: OrderType) {
    const order = await orderModel.findOneAndUpdate({ id: id }, data);
    if (!order) {
        throw new Error('Order not found');
    }
    return order;
} 

export async function getOrderBySearch(query: OrderSearchType) {
  const filters: Record<string, any> = {};
  const orderFilters: Record<string, any> = {
    period: { tag: 'dateOfSale', type: Date },
    status: { tag: 'status', type: String },
    pointSale: { tag: 'pointSale', type: String },
  };
  Object.keys(query).forEach((key) => {
    if (key == 'startPeriod') {
        filters.dateOfSale = {}
        filters.dateOfSale.$gte = new Date(query[key]);
    } 
    if (key == 'endPeriod') {
        filters.dateOfSale.$lte = new Date(query[key]);
    } 
    if (key === 'status') {
        const { tag } = orderFilters[key];
        filters[tag] = query[key];
        console.log(filters.tag);
    }
    if (key == 'pointSale') {
        const { tag} = orderFilters[key];
        filters[tag] = query[key];
    }
  });
    if(Object.keys(filters).length == 0) { 
        return await orderModel.find({});
    }
    return await orderModel.find(filters);
}