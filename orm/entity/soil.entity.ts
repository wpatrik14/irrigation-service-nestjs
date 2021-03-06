import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Zone } from "./zone.entity";
 
@Entity("Soil")
export class Soil {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;

    @OneToOne(_type => Zone, zone => zone.soil)
    zone: Zone;
}