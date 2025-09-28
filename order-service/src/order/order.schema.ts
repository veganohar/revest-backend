import { Schema, model } from 'mongoose';
import { getNextOrderId } from './counter.schema';

const orderItemSchema = new Schema({
  productId: { type: Number, required: true },
  variant: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema({
  id: { type: Number, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  items: [orderItemSchema],
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

orderSchema.pre('save', async function (next) {
  if (!this.id) this.id = await getNextOrderId();
  this.updatedOn = new Date();
  next();
});

export const OrderModel = model('Order', orderSchema);
