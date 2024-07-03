import { Application } from 'express';
import configRouter from './base.router.config';
import Route from './base.router';
import Logger from '../utils/logger';
import ControllersManager from '../controllers/base.controller.manager';
import NextServerManager from 'src/next';
import Helpers from 'src/utils/helpers';

export default class RouterManager {
    private app: Application;
    private controllerManager: ControllersManager;

    constructor(app: Application, controllerManager: ControllersManager) {
        this.app = app;
        this.controllerManager = controllerManager;
    }
    loadRoutes = (nextServer: NextServerManager) => {
        console.log('====================================');
        Logger.log("Loading routes...");
        for (let route in configRouter) {
            this.setupParentRouter(configRouter[route], 1);
        }
        this.setupWildcardRoute(nextServer);
        console.log('====================================');
    }

    setupWildcardRoute = (nextServer: NextServerManager) => {
        nextServer.setupWildcardRoute(this.app)
    }

    private setupParentRouter = (parentRoute: Route, count: number) => {
        Logger.log(` ${'-'.repeat(count)} Parent: ${parentRoute.path}, Method: ${parentRoute.method}`)
        count++;
        for (let childRoute of parentRoute.routes) {
            if (childRoute.routes.length > 0) {
                childRoute.middlewares = [...childRoute.middlewares, ...parentRoute.middlewares]
                childRoute.skipMiddlewares = [...childRoute.skipMiddlewares, ...parentRoute.skipMiddlewares]
                childRoute.path = parentRoute.path + (parentRoute.path.endsWith("/") && childRoute.path.startsWith("/") ? childRoute.path.substring(1) : childRoute.path);
                childRoute.controller = parentRoute.controller;
                this.setupParentRouter(childRoute, count);
            } else {
                this.setupChildRouter(childRoute, count);
            }
        }
    }

    private setupChildRouter = (route: Route, count: number) => {
        Logger.log(` ${'-'.repeat(count)} Route: ${route.path}, Method: ${route.method}`)
        const handler = this.controllerManager.getHandlerByRoute(route);
        if (!handler) {
            Logger.error(`Handler not found for route: ${route.path}`);
            return;
        }
        if (!handler[route.method]) {
            Logger.error(`Method ${route.method} not found in handler for route: ${route.path}`);
            return;
        }
        this.app[route.method.toLowerCase()](route.path, handler[route.method]);
    }

}