import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Zone } from "./zone.entity";
 
@Entity("Plant")
export class Plant {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;

    @OneToOne(_type => Zone, zone => zone.relay)
    zone: Zone;

}