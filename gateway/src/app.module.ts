import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GatewayController } from './gateway.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }), // Loads .env globally
  ],
  controllers: [GatewayController],
  providers: [ProxyService], // <-- Add ProxyService here
})
export class AppModule {}
