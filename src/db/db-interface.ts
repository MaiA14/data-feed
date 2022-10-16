export default interface IDB {
    connect(): Promise<any>;
    getClient(): any;
    get(tableName: string, limit?: number, columns?: Array<string>): Promise<any>;
    set(tableName: string, data?: any): Promise<any>;
}