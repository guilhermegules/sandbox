import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("api/gateway/orders")
export class AppController {
  constructor(
    private readonly service: AppService,
  ) { }

  @Post()
  async createOrder(@Body() body: any) {
    return this.service.createOrder(body)
  }
}
