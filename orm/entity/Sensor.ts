import { Entity, Column, ManyToOne } from "typeorm";
import { Thing } from "./Thing";
import { Zone } from "./Zone";

@Entity("Sensor")
export class Sensor extends Thing {

    @Column()
    updatedOnUTC: Date;

    @Column()
    value: string;

    @ManyToOne(_type => Zone, zone => zone.sensors)
    zone: Zone;
}