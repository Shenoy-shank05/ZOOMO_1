import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  getUserAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  createAddress(userId: string, data: any) {
    return this.prisma.address.create({
      data: { ...data, userId },
    });
  }

  updateAddress(id: string, userId: string, data: any) {
    return this.prisma.address.update({
      where: { id },
      data,
    });
  }

  deleteAddress(id: string, userId: string) {
    return this.prisma.address.delete({
      where: { id },
    });
  }
}
