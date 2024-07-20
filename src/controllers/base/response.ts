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
        return res.status(response.statusCode).json({
            message: response.message,
            statusCode: response.statusCode,
            date: new Date().toISOString(),
            path: res.req.url,
            redirect: response.redirect,
            error: response.error || false,
            data: response.data || {},
        })
    }

    static render = (
        { req, res, page, data }:
            { req: Request, res: Response, page: string, data?: object }
    ) => NextServerManager.render({ req, res, page, data: data || {} });

    static redirect = (res: Response, url: string) => res.redirect(url);
}