import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'check-stock' })
  checkStock(data: any) {
    console.log('Received:', data);
    return { available: true };
  }
}
