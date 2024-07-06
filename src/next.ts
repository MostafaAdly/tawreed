import { Application, Request, Response } from 'express';
import next from 'next';
import { NextServer } from 'next/dist/server/next';
import Helpers from './utils/helpers';
export default class NextServerManager {
    private static nextServer: NextServer = next({ dev: !Helpers.isEnvProduction() });

    initNextServer = async (app: Application) => {
        await NextServerManager.nextServer.prepare()
    }

    setupWildcardRoute = (app: Application) => {
        app.get('*', (req: Request, res: Response) => NextServerManager.nextServer.getRequestHandler()(req, res));
    }

    static render = ({ req, res, page, data }: { req: Request, res: Response, page: string, data?: object }) => {
        NextServerManager.nextServer.render(
            req,
            res,
            page,
            { data: JSON.stringify(data || {}) }
        );
    }
}