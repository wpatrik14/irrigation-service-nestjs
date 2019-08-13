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

    @Get('rain')
    getForecast() {
        return this.service.getForecast().pipe(
            map(response => {
                return response.data.map(weatherData => {
                    return {
                        temp: weatherData.Temperature.Value,
                        mm: weatherData.Rain.Value,                        
                        date: weatherData.DateTime
                    }
                })
            }));
    }
}
