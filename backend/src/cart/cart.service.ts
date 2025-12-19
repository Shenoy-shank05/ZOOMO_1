import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Get user's cart
  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { dish: true } },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: { include: { dish: true } },
        },
      });
    }

    return cart;
  }

  // Add item to cart
  async addItem(userId: string, dishId: string, quantity: number) {
    const dish = await this.prisma.dish.findUnique({ where: { id: dishId } });
    if (!dish) throw new NotFoundException("Dish not found");

    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: true },
      });
    }

    // Swiggy Rule: reset cart if restaurant mismatch
    const existingItem = cart.items?.[0];
    if (existingItem) {
      const existingDish = await this.prisma.dish.findUnique({
        where: { id: existingItem.dishId },
      });

      if (existingDish && existingDish.restaurantId !== dish.restaurantId) {
        await this.prisma.cartItem.deleteMany({
          where: { cartId: cart.id },
        });
      }
    }

    const existing = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, dishId },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        dishId,
        quantity,
      },
    });
  }

  // Update quantity
  async updateItem(id: string, quantity: number) {
    if (quantity <= 0) {
      return this.prisma.cartItem.delete({ where: { id } });
    }

    return this.prisma.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  removeItem(id: string) {
    return this.prisma.cartItem.delete({ where: { id } });
  }

  clearCart(userId: string) {
    return this.prisma.cart.delete({
      where: { userId },
    });
  }
}
