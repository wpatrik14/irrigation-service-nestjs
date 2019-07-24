import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Zone } from "./Zone";
 
@Entity("Forecast")
export class Forecast {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    hours: number;

    @Column()
    mm: number;

    @Column()
    calculation: string;

    @Column()
    enabled: boolean;

    @OneToOne(_type => Zone, zone => zone.forecast)
    zone: Zone;

}