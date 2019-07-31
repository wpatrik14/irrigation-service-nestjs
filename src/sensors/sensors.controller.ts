import { Controller, Post, Req } from '@nestjs/common';
import { Sensor } from 'orm/entity/sensor.entity';
import { Crud } from '@nestjsx/crud';
import { SensorsService } from './sensors.service';
import * as rawbody from 'raw-body';
import { SensorView } from 'src/entities';
import { SensorsGateway } from './sensors.gateway';
import { SQS } from 'aws-sdk';

@Crud({
    model: {
        type: Sensor,
    },
    routes: {
        exclude: ['getManyBase'],
    },
})
@Controller('sensors')
export class SensorsController {
    constructor(public service: SensorsService, public gateway: SensorsGateway) {
        const sqs = new SQS({
            region: 'eu-central-1'
        });
        sqs.receiveMessage({
            AttributeNames: [
               "SentTimestamp"
            ],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: [
               "All"
            ],
            QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/981419062120/sensorsData',
            VisibilityTimeout: 20,
            WaitTimeSeconds: 0
           }, function(err, data) {
            if (err) {
              console.log("Receive Error", err);
            } else if (data.Messages) {
              console.log(`Received message ${data}`)
            }
          });

    }

    @Post('notify')
    async notify(@Req() req) {
        if (req.readable) {
            const raw = await rawbody(req);
            console.log(`Received message from SNS: ${raw}`);
            const body = JSON.parse(raw.toString().trim());
            const sensorView: SensorView = JSON.parse(body.Message.toString().trim());
            const sensor = await this.service.onUpdatedValue(sensorView);
            await this.gateway.notifyClients(sensor);
        }
    }
}
