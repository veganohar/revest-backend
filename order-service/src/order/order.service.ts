import { Injectable } from '@nestjs/common';
import { OrderModel } from './order.schema';
import axios from 'axios';

// Interfaces for Product and Variant
interface ProductVariant {
  qty: string;
  price: number;
  sellingPrice: number;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  shortName: string;
  description: string;
  variants: ProductVariant[];
  createdOn: Date;
  updatedOn: Date;
}

@Injectable()
export class OrderService {
  private productBaseUrl = `http://${process.env.PRODUCT_SERVICE_HOST || 'localhost'}:${process.env.PRODUCT_SERVICE_PORT || 4001}/products`;

  async create(orderData: any) {
    if (!orderData.items || orderData.items.length === 0)
      throw new Error('Order must have at least one item');

    // 1️⃣ Fetch all products in one call
    const productIds = [...new Set(orderData.items.map(i => i.productId))];
    const response = await axios.get<Product[]>(`${this.productBaseUrl}/findByIds/${productIds.join(',')}`);
    const products = response.data;

    // 2️⃣ Assign selling price and validate stock
    orderData.items.forEach(item => {
      delete item.sellingPrice; // ignore client input
      const product = products.find(p => p.id === item.productId);
      if (!product) throw new Error(`Product ${item.productId} not found`);

      const variant = product.variants.find(v => v.qty === item.variant);
      if (!variant) throw new Error(`Variant ${item.variant} not found`);
      if (variant.stock < item.quantity) throw new Error(`Insufficient stock for ${item.variant}`);

      item.sellingPrice = variant.sellingPrice;
    });

    // 3️⃣ Save order immediately
    const order = await new OrderModel(orderData).save();

    // 4️⃣ Async stock update (fire-and-forget)
    orderData.items.forEach(async item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return;

      const updatedVariants = product.variants.map(v =>
        v.qty === item.variant ? { ...v, stock: v.stock - item.quantity } : v
      );

      try {
        await axios.put(`${this.productBaseUrl}/${item.productId}`, { variants: updatedVariants });
      } catch (err) {
        console.error(`Failed to update stock for product ${item.productId}`, err.message);
      }
    });

    return order;
  }


  async findAll() {
    const orders = await OrderModel.find().lean().exec();

    const allProductIds = [...new Set(orders.flatMap(o => o.items.map(i => i.productId)))];

    const idsParam = allProductIds.join(',');
    const productsResponse = await axios.get<Product[]>(
      `${this.productBaseUrl}/findByIds/${idsParam}`
    );

    const products: Product[] = productsResponse.data;

    const ordersWithDetails = orders.map(order => ({
      ...order,
      items: order.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          ...item,
          product: product
            ? { name: product.name, shortName: product.shortName, description: product.description }
            : null,
        };
      }),
    }));

    return ordersWithDetails;

  }

  async findById(id: number) {
    return OrderModel.findOne({ id }).exec();
  }

  async findByIds(ids: number[]) {
    return OrderModel.find({ id: { $in: ids } }).exec();
  }

  async updateById(id: number, updateData: any) {
    updateData.updatedOn = new Date();
    return OrderModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
  }

  async deleteById(id: number) {
    return OrderModel.findOneAndDelete({ id }).exec();
  }

  async deleteByIds(ids: number[]) {
    return OrderModel.deleteMany({ id: { $in: ids } }).exec();
  }
}
