import mongoose from 'mongoose';
import { CounterModel } from './product/counter.schema';
import { ProductModel } from './product/product.schema';

export async function initializeMongo(uri: string) {
  await mongoose.connect(uri);
  console.log('MongoDB connected for Product Service');

  const productCounter = await CounterModel.findOne({ _id: 'productId' });
  if (!productCounter) await CounterModel.create({ _id: 'productId', sequence_value: 0 });

  const existing = await ProductModel.find();
  if (!existing.length) {
    await ProductModel.create({
      name: 'Celestial Chocolate',
      shortName: 'CC',
      description: 'Rich chocolate ice cream',
      variants: [
        { qty: '100ml', price: 100, sellingPrice: 60, stock: 100 },
        { qty: '500ml', price: 450, sellingPrice: 270, stock: 50 },
        { qty: '1lt', price: 750, sellingPrice: 450, stock: 20 }
      ]
    });
    console.log('Default product created');
  }
}
