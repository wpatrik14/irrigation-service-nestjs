import { Entity, Column, ManyToOne } from "typeorm";
import { Thing } from "./thing.entity";
import { Zone } from "./zone.entity";

@Entity("Sensor")
export class Sensor extends Thing {

    @Column()
    updatedOnUTC: Date;

    @Column()
    value: string;

    @ManyToOne(_type => Zone, zone => zone.sensors)
    zone: Zone;
}