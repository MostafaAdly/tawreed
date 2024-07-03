import { Response } from 'express';

export default class InfraResponse {
    statusCode: number = 200;
    message: string = '';
    error: boolean = false;
    data: unknown = {};
    constructor(data: { statusCode: number, message: string, error: boolean, data: unknown }) {
        Object.assign(this, data);
    }

    static send = (res: Response,
        response: {
            statusCode: number,
            message: string,
            error?: boolean,
            data?: unknown
        }
    ) => {
        return res.json(response)
    }
}