import { Application, Request, Response } from 'express';
import configRouter from './base.router.config';
import Route from './base.router';
import Logger from '../utils/logger';
import ControllersManager from '../controllers/base.controller.manager';
import NextServerManager from 'src/next';
import colors from 'colors'
import IndexRenderHandler from '../controllers/render.dev/index.handler';

export default class RouterManager {
    private app: Application;
    private controllerManager: ControllersManager;
    private renderHandler: IndexRenderHandler = new IndexRenderHandler();

    constructor(app: Application, controllerManager: ControllersManager) {
        this.app = app;
        this.controllerManager = controllerManager;
    }
    loadRoutes = (nextServer: NextServerManager) => {
        Logger.log('====================================');
        Logger.log("Loading routes...");
        for (let route in configRouter) {
            this.setupParentRouter(configRouter[route], 1);
        }
        this.setupWildcardRoute(nextServer);
        Logger.log('====================================');
    }

    setupWildcardRoute = (nextServer: NextServerManager) => {
        nextServer.setupWildcardRoute(this.app)
    }

    private setupParentRouter = (parentRoute: Route, count: number) => {
        Logger.log(` ${'-'.repeat(count - 1)}> Parent: ${colors.cyan(parentRoute.path)}, Method: ${parentRoute.method}`)
        count++;
        for (let childRoute of parentRoute.routes) {
            if (childRoute.routes.length > 0) {
                childRoute.middlewares = [...childRoute.middlewares, ...parentRoute.middlewares]
                childRoute.skipMiddlewares = [...childRoute.skipMiddlewares, ...parentRoute.skipMiddlewares]
                childRoute.controller = parentRoute.controller;
                this.setupParentRouter(childRoute, count);
            } else {
                this.setupChildRouter(childRoute, count);
            }
        }
    }

    private setupChildRouter = (route: Route, count: number) => {
        const handlerConfig = this.controllerManager.getHandlerByRoute(route);
        if (!handlerConfig) {
            Logger.error(`Handler not found for route: ${route.path}`);
            return;
        }
        Logger.log(` ${'-'.repeat(count)} Route: ${colors.green(route.path)}, Method: ${route.method}`)
        const handler = (route.render ? this.renderHandler.index : handlerConfig)[route.method]
        if (!handler) {
            Logger.error(`Method ${route.method} not found in handler for route: ${route.path}`);
            return;
        }
        this.app[route.method.toLowerCase()](
            route.path,
            ...(route.middlewares.filter(m => !route.skipMiddlewares.includes(m))),
            (req: Request, res: Response) => handler(req, res, route.render)
        );
    }

}