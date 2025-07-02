import { UserType } from "../types/userType";
import { Schema } from 'mongoose';
import connection from '../db';



const userSchema = new Schema<UserType>({
  store: {
    type: Number,
    required: true,
  },
  id: { type: Number },
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

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const lastUser = await userModel.findOne().sort({ id: -1 });
    this.id = lastUser ? lastUser.id + 1 : 1;
  }
  next();
});

// // @ts-ignore
// import Inc from "mongoose-sequence";
// const AutoIncrement = Inc(mongoose); 


// userSchema.plugin(AutoIncrement, { inc_field: 'id' });

export const userModel = connection.model<UserType>('User', userSchema);