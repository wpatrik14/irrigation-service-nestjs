import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZonesController } from './zones/zones.controller';

@Module({
  imports: [],
  controllers: [AppController, ZonesController],
  providers: [AppService],
})
export class AppModule {}
