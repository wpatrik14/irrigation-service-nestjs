import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Relay } from 'orm/entity/relay.entity';

@Injectable()
export class RelaysService extends TypeOrmCrudService<Relay> {
    constructor(@InjectRepository(Relay) repo) {
        super(repo);
    }
}
