import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Zone } from "./Zone";
 
@Entity("Schedule")
export class Schedule {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    cronExpression: string;

    @Column()
    durationInMinutes: number;

    @Column()
    enabled: boolean;

    @ManyToOne(_type => Zone, zone => zone.schedules)
    zone: Zone;

}