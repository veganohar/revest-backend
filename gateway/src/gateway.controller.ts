import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProxyService } from './proxy.service';

@Controller()
export class GatewayController {
  private productServiceUrl = `http://${process.env.PRODUCT_SERVICE_HOST || 'localhost'}:${process.env.PRODUCT_SERVICE_PORT || 4001}`;
  private orderServiceUrl = `http://${process.env.ORDER_SERVICE_HOST || 'localhost'}:${process.env.ORDER_SERVICE_PORT || 4002}`;

  constructor(private readonly proxyService: ProxyService) { }

  // Generic forwarder
  private async forward(serviceUrl: string, path: string, method: 'get' | 'post' | 'put' | 'delete', body?: any) {
    switch (method) {
      case 'get': return this.proxyService.get(serviceUrl + '/' + path);
      case 'post': return this.proxyService.post(serviceUrl + '/' + path, body);
      case 'put': return this.proxyService.put(serviceUrl + '/' + path, body);
      case 'delete': return this.proxyService.delete(serviceUrl + '/' + path);
    }
  }

  // ---------------- Products ----------------
  @Get('products') getProducts() { return this.forward(this.productServiceUrl, 'products', 'get'); }
  @Get('products/:id') getProductById(@Param('id') id: number) { return this.forward(this.productServiceUrl, `products/${id}`, 'get'); }
  @Post('products') createProduct(@Body() body: any) { return this.forward(this.productServiceUrl, 'products', 'post', body); }
  @Post('products/bulk') createProductsBulk(@Body() body: any[]) { return this.forward(this.productServiceUrl, 'products/bulk', 'post', body); }
  @Put('products/:id') updateProduct(@Param('id') id: number, @Body() body: any) { return this.forward(this.productServiceUrl, `products/${id}`, 'put', body); }
  @Delete('products/:id') deleteProduct(@Param('id') id: number) { return this.forward(this.productServiceUrl, `products/${id}`, 'delete'); }
  @Delete('products/deleteByIds/:ids') deleteProductsByIds(@Param('ids') ids: string) { return this.forward(this.productServiceUrl, `products/deleteByIds/${ids}`, 'delete'); }
  @Get('products/findByIds/:ids') findProductsByIds(@Param('ids') ids: string) { return this.forward(this.productServiceUrl, `products/findByIds/${ids}`, 'get'); }
  // ---------------- Orders ----------------
  @Get('orders') getOrders() { return this.forward(this.orderServiceUrl, 'orders', 'get'); }
  @Get('orders/:id') getOrderById(@Param('id') id: number) { return this.forward(this.orderServiceUrl, `orders/${id}`, 'get'); }
  @Post('orders') createOrder(@Body() body: any) { return this.forward(this.orderServiceUrl, 'orders', 'post', body); }
  @Put('orders/:id') updateOrder(@Param('id') id: number, @Body() body: any) { return this.forward(this.orderServiceUrl, `orders/${id}`, 'put', body); }
  @Delete('orders/:id') deleteOrder(@Param('id') id: number) { return this.forward(this.orderServiceUrl, `orders/${id}`, 'delete'); }
  @Delete('orders/deleteByIds') deleteOrdersByIds(@Param('ids') ids: string) { return this.forward(this.orderServiceUrl, `orders/deleteByIds/${ids}`, 'delete'); }
  @Get('orders/findByIds') findOrdersByIds(@Param('ids') ids: string) { return this.forward(this.orderServiceUrl, `orders/findByIds/${ids}`, 'get'); }
}
