import { Schema, model } from 'mongoose';

const counterSchema = new Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, required: true }
});

export const CounterModel = model('OrderCounter', counterSchema);

export async function getNextOrderId(): Promise<number> {
  const counter = await CounterModel.findOneAndUpdate(
    { _id: 'orderId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
}
