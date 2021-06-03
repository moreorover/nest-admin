import { AuthGuard } from './../auth/auth.guard';
import { OrderService } from './order.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  async all(@Query('page') page = 1) {
    return this.orderService.paginate(page, ['order_items']);
  }
}
