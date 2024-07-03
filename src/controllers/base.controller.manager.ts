import Route from "../routes/base.router";
import baseRouterConfig from "../routes/base.router.config";
import Helpers from "../utils/helpers";
import { ControllerConfig, ControllerHandlerConfig, HttpMethod } from "./base.controller";
import fs from 'fs'
import path from "path";
import Logger from "../utils/logger";

export default class ControllersManager {
    controllers: Map<string, ControllerConfig> = new Map();

    private controllerSuffix: string = '.controller.ts';
    private handlerSuffix: string = '.handler.ts';
    private controllersDirectory: string = path.join(__dirname, '../controllers');

    setupControllers = () => {
        for (let route in baseRouterConfig) {
            const router = baseRouterConfig[route];
            router.setupChildrenRoutes();
            this.setupController(router);
        }
    }

    setupController = (route: Route) => {
        if (!route.controller && route.routes.length != 0) {
            for (let childRoute of route.routes) {
                this.setupController(childRoute);
            }
            return;
        }
        let controller = this.loadController(route);
        if (controller) {
            this.controllers.set(route.controller, controller);
        }
    }

    getHandlerByRoute = (route: Route): Function | null => {
        if (this.controllers.has(route.controller)) {
            let controller = this.controllers.get(route.controller);
            if (controller?.handlers.has(route.handler)) {
                return controller.handlers.get(route.handler)?.function || null;
            }
        }
        return null;
    }

    private loadController = (route: Route): ControllerConfig | null => {
        if (!route.controller) return null;
        const controllerFile = Helpers.findFileInDir(this.controllersDirectory, route.controller + this.controllerSuffix);
        if (!controllerFile) {
            Logger.error(`Controller ${route.controller} not found`);
            return null;
        }

        const controllerParentDirectory = path.join(controllerFile, '..');

        const handlers = this.loadControllerHandlers(controllerParentDirectory, route.routes.map(value => { return { method: value.method, handler: value.handler } }));
        return new ControllerConfig(handlers);
    }

    private loadControllerHandlers = (controllerDirectory, handlersMethodName: { method: HttpMethod, handler: string }[]): Map<string, ControllerHandlerConfig> => {
        let handlers: Map<string, ControllerHandlerConfig> = new Map();
        handlersMethodName.forEach(value => {
            const handler = this.loadHandler(controllerDirectory, value.handler);
            if (handler) {
                handlers.set(value.handler, new ControllerHandlerConfig({ method: value.method, function: handler }));
            }
        });
        return handlers;
    }

    private loadHandler = (parentDirectory: string, handlerName: string): Function | null => {
        for (let file of fs.readdirSync(parentDirectory)) {
            if (file.includes(this.handlerSuffix)) {
                try {
                    const handler = new (require(path.join(parentDirectory, file)).default)();
                    if (handler && handler[handlerName]) {
                        return handler[handlerName];
                    }
                } catch (error) {
                    Logger.error(`Error loading handler ${handlerName} from file ${file}`);
                }
            }
        }
        return null;
    }

}

