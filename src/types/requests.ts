
export interface getDataReq extends Express.Request {
    source: string;
}

export interface updateValueReq extends Express.Request {
    data: {
        rowId?: number;
        fieldToUpdate: string;
        newValue: string;
    }
}

export interface filterReq extends Express.Request {
    filters: {
        limit?: number;
        columns?: Array<string>;
    }
}


