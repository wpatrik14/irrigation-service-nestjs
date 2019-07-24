import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Zone } from "./Zone";
 
@Entity("Location")
export class Location {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    longitude: string;

    @Column()
    latitude: string;

    @OneToOne(_type => Zone, zone => zone.relay)
    zone: Zone;
}