import { Schema } from 'mongoose';
import connection from '../db';
import { id } from 'zod/dist/types/v4/locales';

const storeSchema = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    cnpj: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, );

storeSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastUser = await storeModel.findOne().sort({ id: -1 });
    this.id = lastUser ? lastUser.id + 1 : 1;
  }
  next();
});
export const storeModel = connection.model('Store', storeSchema);