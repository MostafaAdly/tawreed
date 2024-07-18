import { Request, Response } from "express";
import User from "src/database/models/user.model";

export default class BaseController {
    getCurrentUser = (req: Request): User => req['session']?.user;
}


export class ControllerConfig {
    handlers: Map<string, ControllerHandlerConfig> = new Map();
    constructor(handlers: Map<string, ControllerHandlerConfig>) {
        this.handlers = handlers;
    }
}

export class ControllerHandlerConfig {
    method: HttpMethod = HttpMethod.GET;
    function: Function = (_: Request, res: Response) => { res.status(404).send('Not Found') };
    constructor(data: { method: HttpMethod, function: Function }) {
        Object.assign(this, data);
    }
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}