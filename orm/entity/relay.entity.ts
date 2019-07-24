import { Entity, Column, OneToOne } from "typeorm";
import { Thing } from "./thing.entity";
import { Zone } from "./zone.entity";

@Entity("Relay")
export class Relay extends Thing {

    @Column()
    gpio: string;

    @Column()
    lastStartOnUTC: Date;

    @Column()
    lastEndOnUTC: Date;

    @Column()
    status: boolean;

    @OneToOne(_type => Zone, zone => zone.relay)
    zone: Zone;
}