"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utils/logger"));
const base_router_manager_1 = __importDefault(require("./routes/base.router.manager"));
const base_controller_manager_1 = __importDefault(require("./controllers/base.controller.manager"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || '3000');
        this.controllersManager = new base_controller_manager_1.default();
        this.routerManager = new base_router_manager_1.default(this.app, this.controllersManager);
        this.startServer = () => {
            this.listen();
            this.setupControllers();
            this.setupRoutes();
            this.setupMiddlewares();
        };
        this.setupControllers = () => {
            this.controllersManager.setupControllers();
        };
        this.setupRoutes = () => {
            this.routerManager.loadRoutes();
        };
        this.setupMiddlewares = () => {
            this.app.use(express_1.default.json());
        };
        this.listen = () => {
            this.app.listen(this.port, () => {
                logger_1.default.log(`Server is running on port ${this.port}`);
            });
        };
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map