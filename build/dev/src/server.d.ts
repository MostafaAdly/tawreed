export default class Server {
    private app;
    private port;
    private controllersManager;
    private routerManager;
    startServer: () => void;
    setupControllers: () => void;
    setupRoutes: () => void;
    setupMiddlewares: () => void;
    listen: () => void;
}
