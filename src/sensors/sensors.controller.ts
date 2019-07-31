import { Controller, Post, Req } from '@nestjs/common';
import { Sensor } from 'orm/entity/sensor.entity';
import { Crud } from '@nestjsx/crud';
import { SensorsService } from './sensors.service';
import * as rawbody from 'raw-body';
import { SensorView } from 'src/entities';
import { SensorsGateway } from './sensors.gateway';
import * as AWS from 'aws-sdk';

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
    private sqsParams = {
        AttributeNames: [
           "SentTimestamp"
        ],
        MaxNumberOfMessages: 10,
        MessageAttributeNames: [
           "All"
        ],
        QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/981419062120/sensorsData',
        VisibilityTimeout: 20,
        WaitTimeSeconds: 0,
       };
    private sqs;
    
    constructor(public service: SensorsService, public gateway: SensorsGateway) {
        AWS.config.update({region: 'eu-central-1'});
        this.sqs=new AWS.SQS();
        setInterval(() => {
            this.sqs.receiveMessage(this.sqsParams, this.onSensorValueUpdated);
        }, 1000*60);
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

    onSensorValueUpdated(err, data) {
        if (err) {
            console.log("Receive Error", err);
          } else if (data.Messages) {
            console.log(`Received message on SQS: ${data.Messages[0].toString()}`)
            var deleteParams = {
              QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/981419062120/sensorsData',
              ReceiptHandle: data.Messages[0].ReceiptHandle
            };
            this.sqs.deleteMessage(deleteParams, function(err, data) {
              if (err) {
                console.log("Delete Error", err);
              } else {
                console.log("Message Deleted", data);
              }
            });
          }
    }
}
