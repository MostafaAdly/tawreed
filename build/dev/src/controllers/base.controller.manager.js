"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_router_config_1 = __importDefault(require("../routes/base.router.config"));
const helpers_1 = __importDefault(require("../utils/helpers"));
const base_controller_1 = require("./base.controller");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = __importDefault(require("../utils/logger"));
class ControllersManager {
    constructor() {
        this.controllers = new Map();
        this.controllerSuffix = '.controller.ts';
        this.handlerSuffix = '.handler.ts';
        this.controllersDirectory = path_1.default.join(__dirname, '../controllers');
        this.getHandlerByRoute = (route) => {
            var _a;
            if (this.controllers.has(route.controller)) {
                let controller = this.controllers.get(route.controller);
                if (controller === null || controller === void 0 ? void 0 : controller.handlers.has(route.handler)) {
                    return ((_a = controller.handlers.get(route.handler)) === null || _a === void 0 ? void 0 : _a.function) || null;
                }
            }
            return null;
        };
        this.loadController = (route) => {
            const controllerFile = helpers_1.default.findFileInDir(this.controllersDirectory, route.controller + this.controllerSuffix);
            if (!controllerFile) {
                logger_1.default.error(`Controller ${route.controller} not found`);
                return null;
            }
            const controllerParentDirectory = path_1.default.join(controllerFile, '..');
            const handlers = this.loadControllerHandlers(controllerParentDirectory, route.routes.map(value => { return { method: value.method, handler: value.handler }; }));
            return new base_controller_1.ControllerConfig(handlers);
        };
        this.loadControllerHandlers = (controllerDirectory, handlersMethodName) => {
            let handlers = new Map();
            handlersMethodName.forEach(value => {
                const handler = this.loadHandler(controllerDirectory, value.handler);
                if (handler) {
                    handlers.set(value.handler, new base_controller_1.ControllerHandlerConfig({ method: value.method, function: handler }));
                }
            });
            return handlers;
        };
        this.loadHandler = (parentDirectory, handlerName) => {
            for (let file of fs_1.default.readdirSync(parentDirectory)) {
                if (file.includes(this.handlerSuffix)) {
                    try {
                        const handler = new (require(path_1.default.join(parentDirectory, file)).default)();
                        if (handler && handler[handlerName]) {
                            return handler[handlerName];
                        }
                    }
                    catch (error) {
                        logger_1.default.error(`Error loading handler ${handlerName} from file ${file}`);
                    }
                }
            }
            return null;
        };
    }
    setupControllers() {
        for (let route in base_router_config_1.default) {
            let controller = this.loadController(base_router_config_1.default[route]);
            if (controller) {
                this.controllers.set(base_router_config_1.default[route].controller, controller);
            }
        }
    }
}
exports.default = ControllersManager;
//# sourceMappingURL=base.controller.manager.js.map