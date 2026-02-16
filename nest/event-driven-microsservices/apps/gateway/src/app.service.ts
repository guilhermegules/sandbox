import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('ORDERS_SERVICE')
    private ordersClient: ClientProxy,
  ) { }

  createOrder(orderCreated: any) {
    return lastValueFrom(
      this.ordersClient.send(
        { cmd: 'create-order' },
        orderCreated,
      ),
    );
  }
}
