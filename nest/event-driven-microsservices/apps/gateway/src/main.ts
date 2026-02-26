import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   console.log('API Gateway running on 3002')
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
