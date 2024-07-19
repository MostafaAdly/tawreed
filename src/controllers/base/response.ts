import { Request, Response } from 'express';
import NextServerManager from 'src/next';

export default class InfraResponse {
    statusCode: number = 200;
    message: string = '';
    redirect: string;
    error: boolean = false;
    data: unknown = {};
    constructor(data: { statusCode: number, message: string, error: boolean, data: unknown }) {
        Object.assign(this, data);
    }

    static send = (res: Response,
        response: {
            statusCode: number,
            message: string,
            redirect?: string,
            error?: boolean,
            data?: unknown
        }
    ) => {
        const { statusCode, ...rest } = response;
        return res.status(statusCode).json(rest)
    }

    static render = (
        { req, res, page, data }:
            { req: Request, res: Response, page: string, data: object }
    ) => NextServerManager.render({ req, res, page, data });

    static redirect = (res: Response, url: string) => res.redirect(url);
}