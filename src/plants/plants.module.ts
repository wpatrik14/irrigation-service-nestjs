import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from 'orm/entity/plant.entity';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';

@Module({
    imports: [TypeOrmModule.forFeature([Plant])],
    controllers: [PlantsController],
    providers: [PlantsService],
    exports: [PlantsService],
})
export class PlantsModule {}
