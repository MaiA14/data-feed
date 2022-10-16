import { singleton } from "../decorators/singleton";
import { PostgresqlService } from "./postgresql-service";

@singleton
export class DBService {
    private dbType: string = '';
    private db: any;

    constructor(dbType?: string) {
        switch (dbType) {
            default: {
                this.db = new PostgresqlService();
            }
        }
    }

    public async connect(): Promise<any> {
        return await this.db.connect(); // TODO: in the future, handle this
    }

    public getClient() {
        return this.db.getClient;
    }

    public async get(tableName: string, limit?: number, columns?: Array<string>) {
        return await this.db.get(tableName, limit, columns);
    }

    public async set(tableName: string, data?: any) {
        return await this.db.set(tableName, data);
    }
}