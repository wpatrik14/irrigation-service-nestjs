import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forecast } from 'orm/entity/forecast.entity';
import { ForecastsController } from './forecasts.controller';
import { ForecastsService } from './forecasts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Forecast])],
    controllers: [ForecastsController],
    providers: [ForecastsService],
    exports: [ForecastsService],
})
export class ForecastsModule {}
