import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZonesModule } from './zones/zones.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelaysController } from './relays/relays.controller';
import { SensorsController } from './sensors/sensors.controller';
import { ForecastsController } from './forecasts/forecasts.controller';
import { SchedulesController } from './schedules/schedules.controller';
import { PlantsController } from './plants/plants.controller';
import { SoilsController } from './soils/soils.controller';
import { RelaysService } from './relays/relays.service';
import { SensorsService } from './sensors/sensors.service';
import { ForecastsService } from './forecasts/forecasts.service';
import { SchedulesService } from './schedules/schedules.service';
import { PlantsService } from './plants/plants.service';
import { SoilsService } from './soils/soils.service';
import { RelaysModule } from './relays/relays.module';
import { SensorsModule } from './sensors/sensors.module';
import { ForecastsModule } from './forecasts/forecasts.module';
import { SchedulesModule } from './schedules/schedules.module';
import { PlantsModule } from './plants/plants.module';
import { SoilsModule } from './soils/soils.module';
import { AreasController } from './areas/areas.controller';
import { AreasService } from './areas/areas.service';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [TypeOrmModule.forRoot(),
    ZonesModule,
    RelaysModule,
    SensorsModule,
    ForecastsModule,
    SchedulesModule,
    PlantsModule,
    SoilsModule,
    AreasModule],
  controllers: [AppController, RelaysController, SensorsController, ForecastsController, SchedulesController, PlantsController, SoilsController, AreasController],
  providers: [AppService, RelaysService, SensorsService, ForecastsService, SchedulesService, PlantsService, SoilsService, AreasService],
})
export class AppModule {}
