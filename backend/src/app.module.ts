import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './common/prisma.module';
import { PrismaService } from './common/prisma.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { DishesModule } from './dishes/dishes.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AddressModule } from './address/address.module';


@Module({
  imports: [AuthModule, UsersModule,PrismaModule, RestaurantsModule, DishesModule, CartModule, OrdersModule, PaymentsModule, AddressModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
