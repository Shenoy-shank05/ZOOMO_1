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

  /* ================= GET USER ORDERS ================= */
  @Get("mine")
  getMyOrders(@Req() req) {
    if (!req.user || req.user.role !== 'USER') {
      return [];
    }
    return this.ordersService.getUserOrders(req.user.id);
  }

  /* ================= GET ORDER BY ID ================= */
  @Get(":id")
  getOrder(@Param("id") id: string, @Req() req) {
    if (!req.user || req.user.role !== 'USER') {
      return null;
    }
    return this.ordersService.getOrderById(id, req.user.id);
  }

  /* ================= CREATE ORDER ================= */
  @Post()
  createOrder(@Req() req, @Body() body) {
    if (!req.user || req.user.role !== 'USER') {
      return null;
    }
    return this.ordersService.createOrder(req.user.id, body);
  }
}
