import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relay } from 'orm/entity/relay.entity';
import { RelaysController } from './relays.controller';
import { RelaysService } from './relays.service';
import { RelaysGateway } from './relays.gateway';

@Module({
    imports: [TypeOrmModule.forFeature([Relay])],
    controllers: [RelaysController],
    providers: [RelaysService, RelaysGateway ],
    exports: [RelaysService],
})
export class RelaysModule {}
