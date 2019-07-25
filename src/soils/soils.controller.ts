import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Soil } from 'orm/entity/soil.entity';
import { SoilsService } from './soils.service';

@Crud({
    model: {
        type: Soil,
    },
})
@Controller('soils')
export class SoilsController {
    constructor(public service: SoilsService) {}
}
