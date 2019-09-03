import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sensor } from 'orm/entity/sensor.entity';
import { DynamoDB } from 'aws-sdk';

@Injectable()
export class SensorsService extends TypeOrmCrudService<Sensor> {
  constructor(@InjectRepository(Sensor) repo) {
    super(repo);
  }

  async getAllForClient(clientId: string, type: string) {
    const docClient = new DynamoDB.DocumentClient({ region: 'eu-central-1' });
    const params = {
      TableName: 'SensorValue',
      FilterExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': `${clientId}_${type}` },
    };
    try {
      return await docClient.scan(params).promise();
    } catch (e) {
      console.log(e.message)
    }
  }

  async getLatestForClient(clientId: string, type: string) {
    const docClient = new DynamoDB.DocumentClient({ region: 'eu-central-1' });
    const params = {
      TableName: 'SensorValue',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': `${clientId}_${type}` },
      ScanIndexForward : false,
      Limit : 1,
    };
    try {
      return await docClient.query(params).promise();
    } catch (e) {
      console.log(e.message)
    }
  }

  async getTypes(clientId: string) {
    const docClient = new DynamoDB.DocumentClient({ region: 'eu-central-1' });
    const params = {
      TableName: 'SensorType',
      FilterExpression: 'clientId = :clientId',
      ExpressionAttributeValues: { ':clientId': clientId },
    };
    try {
      return await docClient.scan(params).promise();
    } catch (e) {
      console.log(e.message)
    }
  }
}
