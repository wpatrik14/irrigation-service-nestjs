import { Controller, Get, Param } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Zone } from 'orm/entity/Zone';
import { Database } from 'orm/DatabaseManager';

@Controller('zones')
export class ZonesController {

    @Get()
    findAll(): Promise<Zone[]> {
        const database = new Database();
        return database.getConnection()
        .then(connection => {
            return connection.getRepository(Zone).find({ relations: ['sensors', 'relay', 'area']});
        });
    }

    @Get(':id')
    find(@Param('id') id: number): Observable<any> {
        return of('Hello');
    }
}
