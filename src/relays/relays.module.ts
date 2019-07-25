import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Relay } from 'orm/entity/relay.entity';
import { RelaysController } from './relays.controller';
import { RelaysService } from './relays.service';

@Module({
    imports: [TypeOrmModule.forFeature([Relay])],
    controllers: [RelaysController],
    providers: [RelaysService],
    exports: [RelaysService],
})
export class RelaysModule {}
