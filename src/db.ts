import mongoose, { Connection } from "mongoose";

let connection: Connection;
try {
  connection = mongoose.createConnection(`${process.env.MONGODB_LINK}`);
  console.log('✅ MongoDB connected');
} catch (err) {
  console.error('❌ Error connecting to MongoDB:', err);
  process.exit(1);
}
export default connection;