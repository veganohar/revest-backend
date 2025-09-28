import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() body: any) { return this.orderService.create(body); }

  @Get()
  findAll() { return this.orderService.findAll(); }

  @Get(':id')
  findById(@Param('id') id: number) { return this.orderService.findById(id); }

  @Get('findByIds/:ids')
  findByIds(@Param('ids') ids: string) { return this.orderService.findByIds(ids.split(',').map(Number)); }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() body: any) { return this.orderService.updateById(id, body); }

  @Delete(':id')
  deleteById(@Param('id') id: number) { return this.orderService.deleteById(id); }

  @Delete('deleteByIds/:ids')
  deleteByIds(@Param('ids') ids: string) { return this.orderService.deleteByIds(ids.split(',').map(Number)); }
}
