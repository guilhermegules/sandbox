import { Body, Controller, Inject, Post } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller("api/gateway/orders")
export class AppController {
  constructor(
    private service: AppService,
  ) { }

  @Post()
  async createOrder(@Body() body: any) {
    return this.service.createOrder(body)
  }
}
