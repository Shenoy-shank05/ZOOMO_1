import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // GET user orders
  getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { dish: true },
        },
        restaurant: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // GET order details
  async getOrderById(orderId: string, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { dish: true } },
        restaurant: true,
      },
    });

    if (!order) throw new NotFoundException("Order not found");
    if (order.userId !== userId) throw new BadRequestException("Unauthorized");

    return order;
  }

  // CREATE ORDER
  async createOrder(userId: string, data: any) {
    const { addressId, specialInstructions, tip } = data;

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: { include: { dish: true } }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException("Cart is empty");
    }

    // Calculate totals
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.quantity * item.dish.price,
      0
    );

    const deliveryFee = 29; // later dynamic
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax + (tip || 0);

    // All dishes are from same restaurant (cart rule)
    const restaurant = await this.prisma.dish.findUnique({
      where: { id: cart.items[0].dishId },
      include: { restaurant: true },
    });

    // Create order
    const order = await this.prisma.order.create({
      data: {
        userId,
        restaurantId: restaurant!.restaurantId,
        addressId,
        subtotal,
        deliveryFee,
        tax,
        total,
        tip,
        specialInstructions,
        status: "PENDING",
        items: {
          create: cart.items.map((item) => ({
            dishId: item.dishId,
            quantity: item.quantity,
            price: item.dish.price,
            specialInstructions: item.specialInstructions || null,
          })),
        },
      },
    });

    // Clear cart after placing order
    await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  }
}
