import { env } from "process";
import { singleton } from "../decorators/singleton";
import { Utils } from "../utils";
import config from "./config";
const { Client } = require('pg');

@singleton
export class PostgresqlService {
    private client: any = null;
    constructor() {
        this.client = new Client({
            host: config.server.ip,
            user: config.server.username,
            password: config.server.password,
            database: config.server.dbName,
            port: process.env.DB_PORT,
            ssl: false
        });
    }


    public async connect(): Promise<any> {
        console.log('connect from postgresql instance');
        try {
            await this.client.connect();
            const res = await this.client.query("SELECT * FROM pg_stat_activity WHERE datname = 'feed' and state = 'active';");
            console.log('connection to db: ', res.rowCount);
            // await this.client.end();
        } catch (e) {
            console.log('could not connect to db', e);
        }
    }

    public getClient(): Promise<any> {
        return this.client;
    }

    public async set(tableName: string, data: any): Promise<any> {
        await this.client.query(`INSERT INTO ${tableName} (feed_id,updated_time, user_id, feed_data) VALUES ('e8e62951-921b-4e83-a141',
        '2022-11-14 00:00:00', '84a01716-8eab-40bf-822f-2e0432688a38',
        '${JSON.stringify(data)}');`);
    }

    public async get(tableName: string, limit?: any, columns?: Array<string>): Promise<any> {
        const res = await this.client.query(`SELECT * FROM ${tableName} LIMIT 1`);
        let rows = res.rows[0].feed_data;
        let results = rows;

        if (limit !== undefined) {
            let limitedResults = [];
            for (let i = 0; i < results.length; i++) {
                if (i < limit) {
                    limitedResults.push(rows[i]);
                }
            }
            results = limitedResults;
        }
        
        if (columns !== null) {
            results = Utils.filterFieldsFromArr(columns, results);
        }
        return results;
    }
}
