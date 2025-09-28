import { Injectable } from '@nestjs/common';
import { ProductModel } from './product.schema';
import { getNextProductIds  } from './counter.schema';

@Injectable()
export class ProductService {
  async create(data: any) { return new ProductModel(data).save(); }
    async createBulk(products: any[]) {
    if (!products.length) return [];
    // Get starting sequential ID from counter
    const startId = await getNextProductIds(products.length);
    // Assign IDs and timestamps
    products.forEach((p, index) => {
      p.id = startId + index;
      p.createdOn = new Date();
      p.updatedOn = new Date();
    });
    // Bulk insert
    return ProductModel.insertMany(products);
  }
  async findAll() { return ProductModel.find().exec(); }
  async findById(id: number) { return ProductModel.findOne({ id }).exec(); }
  async findByIds(ids: number[]) { return ProductModel.find({ id: { $in: ids } }).exec(); }
  async updateById(id: number, updateData: any) {
    updateData.updatedOn = new Date();
    return ProductModel.findOneAndUpdate({ id }, updateData, { new: true }).exec();
  }
  async deleteById(id: number) { return ProductModel.findOneAndDelete({ id }).exec(); }
  async deleteByIds(ids: number[]) { return ProductModel.deleteMany({ id: { $in: ids } }).exec(); }
}
