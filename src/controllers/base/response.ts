import { Request, Response } from 'express';
import NextServerManager from 'src/next';
import BaseController from './base.controller';

export default class InfraResponse extends BaseController {

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