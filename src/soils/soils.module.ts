import { Module } from '@nestjs/common';
import { Soil } from 'orm/entity/soil.entity';
import { SoilsController } from './soils.controller';
import { SoilsService } from './soils.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Soil])],
    controllers: [SoilsController],
    providers: [SoilsService],
    exports: [SoilsService],
})
export class SoilsModule {}
