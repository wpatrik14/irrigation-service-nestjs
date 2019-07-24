import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Zone } from "./zone.entity";
 
@Entity("Area")
export class Area {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    name: string;

    @Column()
    enabled: boolean;

    @OneToMany(_type => Zone, zone => zone.area, {
        cascade: true
    })
    zones: Zone[];

}