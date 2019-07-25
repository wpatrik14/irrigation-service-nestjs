import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Forecast } from 'orm/entity/forecast.entity';
import { ForecastsService } from './forecasts.service';

@Crud({
    model: {
        type: Forecast,
    },
})
@Controller('forecasts')
export class ForecastsController {
    constructor(public service: ForecastsService) {}
}
