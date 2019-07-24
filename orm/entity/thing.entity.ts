import {Column, PrimaryGeneratedColumn} from "typeorm";
 
export abstract class Thing {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    endpoint: string;
 
    @Column()
    clientId: string;

}