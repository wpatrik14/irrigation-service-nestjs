import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne} from "typeorm";
import { Relay } from "./relay.entity";
import { Soil } from "./soil.entity";
import { Plant } from "./plant.entity";
import { Forecast } from "./forecast.entity";
import { Schedule } from "./schedule.entity";
import { Location } from "./location.entity";
import { Area } from "./area.entity";
import { WaterUsage } from "./waterusage.entity";
import { Sensor } from "./sensor.entity";
 
@Entity("Zone")
export class Zone {
 
    @PrimaryGeneratedColumn()
    id: number;
 
    @OneToOne(_type => Relay, relay => relay.zone)
    @JoinColumn()
    relay: Relay;

    @OneToMany(_type => Sensor, sensor => sensor.zone, {
        cascade: true
    })
    sensors: Sensor[];

    @OneToOne(_type => Soil, soil => soil.zone)
    @JoinColumn()
    soil: Soil;

    @OneToOne(_type => Plant, plant => plant.zone)
    @JoinColumn()
    plant: Plant;

    @OneToOne(_type => Forecast, forecast => forecast.zone, {
        cascade: true
    })
    @JoinColumn()
    forecast: Forecast;

    @OneToMany(_type => Schedule, schedule => schedule.zone, {
        cascade: true
    })
    schedules: Schedule[];

    @OneToMany(_type => WaterUsage, waterUsage => waterUsage.zone, {
        cascade: true
    })
    waterUsages: WaterUsage[];

    @OneToOne(_type => Location, location => location.zone, {
        cascade: true
    })
    @JoinColumn()
    location: Location;

    @ManyToOne(_type => Area, area => area.zones)
    area: Area;

    @Column()
    name: string;

    @Column()
    enabled: boolean;

    @Column({
        nullable: true
    })
    runningLimitInMinutes: number;

    @Column({
        nullable: true
    })
    surfaceSizeInMeter2: number;

    @Column({
        nullable: true
    })
    waitTimeInMinutes: number;

}