import express, { Application } from 'express';
import Logger from './utils/logger';
import RouterManager from './routes/base.router.manager';
import ControllersManager from './controllers/base.controller.manager';
export default class Server {
    private app: Application = express();
    private port: number = parseInt(process.env.PORT || '3000');
    private controllersManager: ControllersManager = new ControllersManager();
    private routerManager: RouterManager = new RouterManager(this.app, this.controllersManager);

    startServer = () => {
        this.listen();
        this.setupControllers();
        console.log(this.controllersManager.controllers)
        this.setupRoutes();
    }

    setupControllers = () => {
        this.controllersManager.setupControllers();
    }

    setupRoutes = () => {
        this.routerManager.loadRoutes();
    }

    setupMiddlewares = () => {
        this.app.use(express.json());
    }

    listen = () => {
        this.app.listen(this.port, () => {
            Logger.log(`Server is running on port ${this.port}`);
        });
    }
}