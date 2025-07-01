import { UserType } from "../types/userType";

import { Schema } from 'mongoose';
import connection from '../db';

const userSchema = new Schema<UserType>({
    store: {
        type: Number,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export const userModel = connection.model<UserType>('User', userSchema);
