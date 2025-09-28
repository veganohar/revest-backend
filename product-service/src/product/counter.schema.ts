import { Schema, model } from 'mongoose';

const counterSchema = new Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, required: true }
});

export const CounterModel = model('Counter', counterSchema);

export async function getNextProductId(): Promise<number> {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: 'productId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
}

export async function getNextProductIds(count: number): Promise<number> {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: 'productId' },
    { $inc: { sequence_value: count } },
    { new: true, upsert: true }
  );

  const startId = counter.sequence_value - count + 1;
  return startId;
}