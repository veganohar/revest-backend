import mongoose from 'mongoose';
import { CounterModel } from './order/counter.schema';

export async function initializeMongo(uri: string) {
  await mongoose.connect(uri);
  console.log('MongoDB connected for Order Service');

  const orderCounter = await CounterModel.findOne({ _id: 'orderId' });
  if (!orderCounter) await CounterModel.create({ _id: 'orderId', sequence_value: 0 });
}
