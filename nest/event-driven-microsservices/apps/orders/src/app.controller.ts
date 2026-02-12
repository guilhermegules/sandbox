import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('INVENTORY_SERVICE')
    private inventoryClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'create-order' })
  async createOrder(data: { productId: string; quantity: number }) {
    const inventoryResponse = await lastValueFrom(
      this.inventoryClient.send(
        { cmd: 'check-stock' },
        data,
      ),
    );

    if (!inventoryResponse.available) {
      return { success: false, message: 'Out of stock' };
    }

    return { success: true, message: 'Order created' };
  }
}
