import { Schema } from  'mongoose';
import  connection from '../db';

const orderSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    store: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    dateOfSale: {
        type: Date,
        required: true,
    },
    parcial: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    shipmentValue: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    customer: {
        id: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            required: true,
        },
        rg: {
            type: String,
            required: true,
        },
        neighborhood: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        recipient: {
            type: String,
            required: true,
        }
    },
    productsSold: [{
    id: {
        type: Number,
        required: true,
     },
    name: {
            type: String,
            required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
    }],
}, {
    timestamps: true,
});

orderSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastCreatedOrder = await orderModel.findOne().sort({ id: -1 });
    this.id = lastCreatedOrder ? lastCreatedOrder.id + 1 : 1;
  }
  next();
});

export const orderModel = connection.model('orders', orderSchema);