export type OrderType = {
    id: number;
    store: number;
    status: string;
    orderId: string;
    dateOfSale: Date;
    parcial: number;
    discount: number;
    shipmentValue: number;
    total: number;
    customer: {
        id: number;
        name: string;
        cpf: string;
        rg: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
        address: string;
        number: number;
        country: string;
        recipient: string;
    };
    productsSold: {
        id: number;
        name: string;
        sku: string;
        price: number;
        quantity: number;
        total: number;
    };
    createdAt?: Date;
    updatedAt?: Date;
};
 