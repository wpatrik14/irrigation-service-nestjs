import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Zone } from "./zone.entity";
 
@Entity("Location")
export class Location {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @OneToOne(_type => Zone, zone => zone.relay)
    zone: Zone;
}