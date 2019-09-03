import {Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Zone } from "./zone.entity";
 
export abstract class Thing {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    endpoint: string;
 
    @Column()
    clientId: string;

    @ManyToOne(_type => Zone, zone => zone.sensors)
    zone: Zone;
}