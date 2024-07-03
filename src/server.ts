import express, { Application } from 'express';
import Logger from './utils/logger';
import RouterManager from './routes/base.router.manager';
import ControllersManager from './controllers/base.controller.manager';
import next from 'next';
import NextServerManager from './next';
export default class Server {
    private developmentMode: boolean = process.env.ENVIRONMENT == "development";
    private app: Application = express();
    private nextServer: NextServerManager = new NextServerManager();
    private port: number = parseInt(process.env.PORT || '3000');
    private controllersManager: ControllersManager = new ControllersManager();
    private routerManager: RouterManager = new RouterManager(this.app, this.controllersManager);

    startServer = async () => {
        await this.initNextServer();
        this.listen();
        this.setupControllers();
        this.setupRoutes();
        this.setupMiddlewares();
    }

    setupControllers = () => {
        this.controllersManager.setupControllers();
    }

    setupRoutes = () => {
        this.routerManager.loadRoutes(this.nextServer);
    }

    setupMiddlewares = () => {
        this.app.use(express.json());
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