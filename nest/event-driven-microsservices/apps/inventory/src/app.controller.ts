import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type { OrderCreatedEvent } from "@common/events";

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'check-stock' })
  checkStock(data: OrderCreatedEvent) {
    console.log('Received:', data);
    return { available: true };
  }
}
