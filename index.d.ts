import { Send } from 'express-serve-static-core';
export { };

declare global {
  namespace Express {
    interface Request {
      body: any
    }
  }
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface TypedResponse<ResBody> extends Express.Response {
  send: any;
  json: Send<ResBody, this>;
}