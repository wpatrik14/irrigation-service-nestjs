import { Connection, ConnectionManager, ConnectionOptions, createConnection, getConnectionManager } from 'typeorm'
import { Area } from './entity/Area';
import { Forecast } from './entity/Forecast';
import { Location } from './entity/Location';
import { Plant } from './entity/Plant';
import { Relay } from './entity/Relay';
import { Schedule } from './entity/Schedule';
import { Sensor } from './entity/Sensor';
import { Soil } from './entity/Soil';
import { WaterUsage } from './entity/WaterUsage';
import { Zone } from './entity/Zone';

/**
 * Database manager class
 */
export class Database {
    private connectionManager: ConnectionManager;

    constructor() {
        this.connectionManager = getConnectionManager();
    }

    public async getConnection(): Promise<Connection> {
        const CONNECTION_NAME = `default`;

        let connection: Connection;

        if (this.connectionManager.has(CONNECTION_NAME)) {
            connection = await this.connectionManager.get(CONNECTION_NAME);

            if (!connection.isConnected) {
                connection = await connection.connect();
            }
        } else {
            const connectionOptions: ConnectionOptions = {
                type: 'postgres',
                host: 'irrigationdb.cwwnz9coipht.eu-central-1.rds.amazonaws.com',
                port: 5432,
                username: 'root',
                password: 'admin1234',
                database: 'irrigation',
                entities: [
                  Area, Forecast, Location, Plant, Relay, Schedule, Sensor, Soil, WaterUsage, Zone
                ],
                synchronize: false,
                logging: true,
              };

            // Don't need a pwd locally
            if (process.env.password) {
                Object.assign(connectionOptions, {
                    password: process.env.password,
                });
            }
            connection = await createConnection(connectionOptions);
        }

        return connection;
    }
}