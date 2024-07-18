import express, { Application } from 'express';
import Logger from './utils/logger';
import RouterManager from './routes/base.router.manager';
import ControllersManager from './controllers/base.controller.manager';
import NextServerManager from './next';
import MiddlewareManager from './middlewares/middleware.manager';
export default class Server {
    private app: Application = express();
    private nextServer: NextServerManager = new NextServerManager();
    private port: number = parseInt(process.env.PORT || '3000');
    private controllersManager: ControllersManager = new ControllersManager();
    private middlewareManager: MiddlewareManager = new MiddlewareManager();
    private routerManager: RouterManager = new RouterManager(this.app, this.controllersManager, this.middlewareManager);

    startServer = async () => {
        await this.initNextServer();
        this.listen();
        this.setupControllers();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    setupControllers = () => {
        this.controllersManager.setupControllers();
    }

    setupRoutes = () => {
        this.routerManager.loadRoutes(this.nextServer);
    }

    setupMiddlewares = () => {
        this.middlewareManager.loadMiddlewares();
        this.middlewareManager.setupDefaultMiddlewares(this.app);
    }

    initNextServer = async () => {
        await this.nextServer.initNextServer(this.app);
    }

    listen = () => {
        this.app.listen(this.port, () => {
            Logger.log(`Server is running on port ${this.port}`);
        });
    }
}