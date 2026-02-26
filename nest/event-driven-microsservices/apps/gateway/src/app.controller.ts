import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import type { OrderCreatedEvent } from "@common/events";

@Controller("api/gateway/orders")
export class AppController {
  constructor(
    private readonly service: AppService,
  ) { }

  @Post()
  async createOrder(@Body() body: OrderCreatedEvent) {
    return this.service.createOrder(body)
  }
}
