import {Entity, Column, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Zone } from "./Zone";
 
@Entity("Plant")
export class Plant {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;

    @OneToOne(_type => Zone, zone => zone.relay)
    zone: Zone;

}