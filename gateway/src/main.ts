import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config(); // Load .env variables
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('API Gateway running on http://localhost:3000');
}

bootstrap();