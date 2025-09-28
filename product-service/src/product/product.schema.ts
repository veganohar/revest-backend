import { Schema, model } from 'mongoose';
import { getNextProductId } from './counter.schema';

const variantSchema = new Schema({
  qty: { type: String, required: true },
  price: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productSchema = new Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String },
  variants: [variantSchema],
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

productSchema.pre('save', async function (next) {
  if (!this.id) this.id = await getNextProductId();
  this.updatedOn = new Date();
  next();
});

export const ProductModel = model('Product', productSchema);
