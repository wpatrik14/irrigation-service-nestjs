import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Zone } from "./Zone";
 
@Entity("WaterUsage")
export class WaterUsage {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    fromUTC: Date;

    @Column()
    toUTC: Date;

    @Column()
    volumeInLiter: number;

    @ManyToOne(_type => Zone, zone => zone.waterUsages)
    zone: Zone;
}