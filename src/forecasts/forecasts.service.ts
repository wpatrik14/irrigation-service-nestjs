import { Injectable, HttpService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Forecast } from 'orm/entity/forecast.entity';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { WeatherData, LocationData } from './forecasts.entity';
import { switchMap, map } from 'rxjs/operators';
import { ZoneView } from 'src/entities';
import { Zone } from 'orm/entity/zone.entity';

@Injectable()
export class ForecastsService extends TypeOrmCrudService<Forecast> {
    private static apikey: string = 'jKAvp2Upynuouono9AuQaecsMfDF8HBN';

    constructor(@InjectRepository(Forecast) repo, private readonly httpService: HttpService) {
        super(repo);
    }

    shouldIrrigate(zone: Zone) {
        this.getForecast(zone.location.latitude, zone.location.longitude).pipe(
            map(weatherData => {
               weatherData.data.map(data => data.Rain.Value) 
            })
        );
    }

    getForecast(latitude: number, longitude: number) {
        return this.getLocation(latitude, longitude).pipe(
            switchMap(location => {
                return this.getWeatherData(location.data.Key);
            })
        )
    }

    private getWeatherData(cityCode: string): Observable<AxiosResponse<WeatherData[]>> {
        return this.httpService.get(`http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${cityCode}`, {
            params: {
                details: true,
                metric: true,
                apikey: ForecastsService.apikey,
            }
        });
    }

    private getLocation(latitude: number, longitude: number): Observable<AxiosResponse<LocationData>> {
        return this.httpService.get('http://dataservice.accuweather.com/locations/v1/cities/geoposition/search', {
            params: {
                apikey: ForecastsService.apikey,
                q: `${latitude},${longitude}`,
            }
        });
    }


}
