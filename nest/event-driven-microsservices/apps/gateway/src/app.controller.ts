import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller("api/gateway/orders")
export class AppController {
   constructor(
    @Inject('ORDERS_SERVICE')
    private ordersClient: ClientProxy,
  ) {}

  @Post()
  async createOrder(@Body() body: any) {
    return lastValueFrom(
      this.ordersClient.send(
        { cmd: 'create-order' },
        body,
      ),
    );
  }
}
