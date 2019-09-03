import { Entity } from "typeorm";
import { Thing } from "./thing.entity";

@Entity("Sensor")
export class Sensor extends Thing {
}