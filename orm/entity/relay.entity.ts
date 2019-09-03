import { Entity, Column, OneToOne } from "typeorm";
import { Thing } from "./thing.entity";

@Entity("Relay")
export class Relay extends Thing {

    @Column()
    gpio: string;

    @Column()
    lastStartOnUTC: Date;

    @Column()
    lastEndOnUTC: Date;

    @Column()
    status: boolean;
}