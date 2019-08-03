import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Schedule } from 'orm/entity/schedule.entity';
import { RelaysService } from 'src/relays/relays.service';
import { CronJob } from 'cron';
import { ScheduleView } from 'src/entities';
import { ZonesService } from 'src/zones/zones.service';
import { IsNull, Not } from 'typeorm';

@Injectable()
export class SchedulesService extends TypeOrmCrudService<Schedule> {
    private jobs: Map<number, CronJob> = new Map();

    constructor(@InjectRepository(Schedule) repo, private relaysService: RelaysService, private zonesService: ZonesService) {
        super(repo);
        this.initSchedules();
    }

    async initSchedules() {
        const zones = await this.zonesService.find({ relations: ['relay', 'schedules'], where: { schedules: Not(IsNull()) } });
        zones.forEach(zone => {
            zone.schedules.filter(schedule => schedule.enabled).forEach(schedule => {
                const job = new CronJob(schedule.cronExpression, () => {
                    const relayView = {
                        endpoint: zone.relay.endpoint,
                        clientId: zone.relay.clientId,
                        gpio: zone.relay.gpio,
                        status: true,
                        duration: schedule.durationInMinutes,
                    }
                    this.relaysService.switch(relayView);
                }, null, true);
                this.jobs.set(schedule.id, job);
                console.log(`Setup schedule for ${zone.name} zone with cron ${schedule.cronExpression}`);
            });
        });
    }

    async toogleSchedule(scheduleView: ScheduleView) {
        if (scheduleView.enabled) {
            return this.scheduleZone(scheduleView);
        } else {
            return this.disableSchedule(scheduleView.id);
        }
    }

    async scheduleZone(scheduleView: ScheduleView) {
        const zone = await this.zonesService.findOne({ relations: ['relay'], where: { id: scheduleView.zone.id } });
        let savedSchedule = await this.repo.findOne({ id: scheduleView.id});
        if (!savedSchedule) {
            const schedule = new Schedule();
            schedule.cronExpression = scheduleView.cronExpression;
            schedule.durationInMinutes = scheduleView.durationInMinutes;
            schedule.enabled = scheduleView.enabled;
            schedule.zone = zone;
            savedSchedule = await this.repo.save(schedule);
        }
        const job = new CronJob(savedSchedule.cronExpression, () => {
            const relayView = {
                endpoint: zone.relay.endpoint,
                clientId: zone.relay.clientId,
                gpio: zone.relay.gpio,
                status: true,
                duration: savedSchedule.durationInMinutes,
            }
            this.relaysService.switch(relayView);
        }, null, scheduleView.enabled);
        this.jobs.set(savedSchedule.id, job);
        console.log("Scheduled zone");
        return savedSchedule;
    }

    async disableSchedule(id: number) {
        const schedule = await this.repo.findOne({ id: id});
        this.jobs.get(schedule.id).stop();
        schedule.enabled = false;
        this.jobs.delete(schedule.id);
        console.log("Deactivated schedule");
        return this.repo.save(schedule);
    }

    async deleteSchedule(id: number) {
        const schedule = await this.repo.findOne({ id: id});
        const job = this.jobs.get(schedule.id);
        if (job) {
            job.stop();
        }
        this.jobs.delete(schedule.id);
        console.log("Removed schedule");
        return this.repo.delete(schedule);
    }
}
