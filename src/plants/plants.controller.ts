import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Plant } from 'orm/entity/plant.entity';
import { PlantsService } from './plants.service';

@Crud({
    model: {
        type: Plant,
    },
})
@Controller('plants')
export class PlantsController {
    constructor(public service: PlantsService) {}
}
