import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("cart")
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.id);
  }

  @Post("items")
  addItem(@Req() req, @Body() body) {
    const { dishId, quantity } = body;
    return this.cartService.addItem(req.user.id, dishId, quantity);
  }

  @Patch("items/:id")
  updateItem(@Param("id") id: string, @Body() body) {
    return this.cartService.updateItem(id, body.quantity);
  }

  @Delete("items/:id")
  removeItem(@Param("id") id: string) {
    return this.cartService.removeItem(id);
  }

  @Delete()
  clearCart(@Req() req) {
    return this.cartService.clearCart(req.user.id);
  }
}
