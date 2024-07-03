"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_config_1 = __importDefault(require("./base.router.config"));
const logger_1 = __importDefault(require("../utils/logger"));
class RouterManager {
    constructor(app, controllerManager) {
        this.loadRoutes = () => {
            console.log('====================================');
            logger_1.default.log("Loading routes...");
            for (let route in base_router_config_1.default) {
                this.setupParentRouter(base_router_config_1.default[route], 1);
            }
            console.log('====================================');
        };
        this.setupParentRouter = (parentRoute, count) => {
            logger_1.default.log(` ${'-'.repeat(count)} Parent: ${parentRoute.path}, Method: ${parentRoute.method}`);
            count++;
            for (let childRoute of parentRoute.routes) {
                if (childRoute.routes.length > 0) {
                    childRoute.middlewares = [...childRoute.middlewares, ...parentRoute.middlewares];
                    childRoute.skipMiddlewares = [...childRoute.skipMiddlewares, ...parentRoute.skipMiddlewares];
                    childRoute.path = parentRoute.path + (parentRoute.path.endsWith("/") && childRoute.path.startsWith("/") ? childRoute.path.substring(1) : childRoute.path);
                    childRoute.controller = parentRoute.controller;
                    this.setupParentRouter(childRoute, count);
                }
                else {
                    this.setupChildRouter(childRoute, count);
                }
            }
        };
        this.setupChildRouter = (route, count) => {
            logger_1.default.log(` ${'-'.repeat(count)} Route: ${route.path}, Method: ${route.method}`);
            const handler = this.controllerManager.getHandlerByRoute(route);
            if (!handler) {
                logger_1.default.error(`Handler not found for route: ${route.path}`);
                return;
            }
            if (!handler[route.method]) {
                logger_1.default.error(`Method ${route.method} not found in handler for route: ${route.path}`);
                return;
            }
            this.app[route.method.toLowerCase()](route.path, handler[route.method]);
        };
        this.app = app;
        this.controllerManager = controllerManager;
    }
}
exports.default = RouterManager;
//# sourceMappingURL=base.router.manager.js.map