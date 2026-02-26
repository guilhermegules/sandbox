import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ORDERS_SERVICE')
    private readonly ordersClient: ClientProxy,
  ) { }

  createOrder(body: any) {
    return this.ordersClient.send(
      { cmd: 'create-order' },
      body,
    )
  }
}
