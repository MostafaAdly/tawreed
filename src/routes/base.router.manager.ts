import {
    Application,
    Request, Response
} from 'express';
import configRouter from './base.router.config';
import Route from './base.router';
import Logger from '../utils/logger';
import ControllersManager from '../controllers/base/base.controller.manager';
import NextServerManager from 'src/next';
import colors from 'colors'
import IndexRenderHandler from '../controllers/base/automatic_render/index.handler';
import MiddlewareManager from '../middlewares/middleware.manager';
import BaseDTOManager from 'src/controllers/base/base.dto.manager';

export default class RouterManager {
    private app: Application;
    private controllerManager: ControllersManager;
    private renderHandler: IndexRenderHandler = new IndexRenderHandler();
    private middlewareManager: MiddlewareManager;

    constructor(app: Application, controllerManager: ControllersManager, middlewareManager: MiddlewareManager) {
        this.app = app;
        this.controllerManager = controllerManager;
        this.middlewareManager = middlewareManager;
    }
    loadRoutes = async (nextServer: NextServerManager) => {
        Logger.log('====================================');
        Logger.log("Loading routes...");
        for (let route in configRouter) {
            await this.setupParentRouter(configRouter[route], 1);
        }
        this.setupWildcardRoute(nextServer);
        Logger.log('====================================');
    }

    setupWildcardRoute = (nextServer: NextServerManager) => {
        nextServer.setupWildcardRoute(this.app)
    }

    private setupParentRouter = async (parentRoute: Route, count: number) => {
        Logger.log(` ${'-'.repeat(count - 1)}> Parent: ${colors.cyan(parentRoute.path)}`)
        count++;
        for (let childRoute of parentRoute.routes) {
            childRoute.middlewares = [...childRoute.middlewares, ...parentRoute.middlewares]
            childRoute.skipMiddlewares = [...childRoute.skipMiddlewares, ...parentRoute.skipMiddlewares]
            if (childRoute.routes.length > 0) {
                childRoute.controller = parentRoute.controller;
                await this.setupParentRouter(childRoute, count);
            } else {
                await this.setupChildRouter(childRoute, count);
            }
        }
    }

    private setupChildRouter = async (route: Route, count: number) => {
        const handlerConfig = this.controllerManager.getHandlerByRoute(route);
        if (!route.render && !handlerConfig) {
            Logger.error(`Handler '${route.handler}' not found for route: ${route.path}`);
            return;
        }
        Logger.log(` ${'-'.repeat(count)} Route: ${colors.green(route.path)}, Method: ${route.method['yellow']}, Handler: ${route.handler}`)
        const handler = (route.render ? this.renderHandler.index : handlerConfig)[route.method]
        if (!handler) {
            Logger.error(`Method ${route.method} not found in handler for route: ${route.path}`);
            return;
        }
        await BaseDTOManager.loadDTO(route);
        try {
            this.app[route.method.toLowerCase()](
                route.path,
                ...this.middlewareManager.getMiddlewares(route.middlewares.filter(m => !route.skipMiddlewares.includes(m))),
                (req: Request, res: Response) => handler(req, res, route.render)
            );
        } catch (error) {
        }
    }
}
