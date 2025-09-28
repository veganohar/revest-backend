import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeMongo } from './init';

async function bootstrap() {
  await initializeMongo(process.env.MONGO_URI || 'mongodb://mongo:27017/shop');

  const app = await NestFactory.create(AppModule);
  await app.listen(4002);
  console.log('Order Service running on port 4002');
}

bootstrap();
