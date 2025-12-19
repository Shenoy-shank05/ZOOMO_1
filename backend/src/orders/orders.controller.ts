import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("orders")
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // GET /orders/mine
  @Get("mine")
  getMyOrders(@Req() req) {
    return this.ordersService.getUserOrders(req.user.id);
  }

  // GET /orders/:id
  @Get(":id")
  getOrder(@Param("id") id: string, @Req() req) {
    return this.ordersService.getOrderById(id, req.user.id);
  }

  // CREATE ORDER
  @Post()
  createOrder(@Req() req, @Body() body) {
    return this.ordersService.createOrder(req.user.id, body);
  }
}
