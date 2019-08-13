import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Forecast } from 'orm/entity/forecast.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { WeatherData } from './forecasts.entity';

@Injectable()
export class ForecastsService extends TypeOrmCrudService<Forecast> {
    constructor(@InjectRepository(Forecast) repo, private readonly httpService: HttpService) {
        super(repo);
    }

    getForecast(): Observable<AxiosResponse<WeatherData[]>> {
        return this.httpService.get('http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/190590?apikey=jKAvp2Upynuouono9AuQaecsMfDF8HBN&details=true&metric=true');
    }
}
