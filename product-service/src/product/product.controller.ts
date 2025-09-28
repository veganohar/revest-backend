import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() body: any) { return this.productService.create(body); }

  @Post('bulk')
  createBulk(@Body() body: any[]) { return this.productService.createBulk(body); }

  @Get()
  findAll() { return this.productService.findAll(); }

  @Get(':id')
  findById(@Param('id') id: number) { return this.productService.findById(id); }

  @Get('findByIds/:ids')
  findByIds(@Param('ids') ids: string) { return this.productService.findByIds(ids.split(',').map(Number)); }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() body: any) { return this.productService.updateById(id, body); }

  @Delete(':id')
  deleteById(@Param('id') id: number) { return this.productService.deleteById(id); }

  @Delete('deleteByIds/:ids')
  deleteByIds(@Param('ids') ids: string) { return this.productService.deleteByIds(ids.split(',').map(Number)); }

}
