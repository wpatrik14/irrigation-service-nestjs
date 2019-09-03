import { Controller, Get } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Forecast } from 'orm/entity/forecast.entity';
import { ForecastsService } from './forecasts.service';
import { map, switchMap } from 'rxjs/operators';

@Crud({
    model: {
        type: Forecast,
    },
})
@Controller('forecasts')
export class ForecastsController {
    constructor(public service: ForecastsService) {}

    @Get('data')
    getForecast() {
        return this.service.getForecast(46.804116, 17.804950).pipe(
            map(weatherData => {
                return weatherData.data;
            }) 
        );
    }

}
