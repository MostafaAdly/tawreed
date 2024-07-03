import { Application } from 'express';
import ControllersManager from '../controllers/base.controller.manager';
export default class RouterManager {
    private app;
    private controllerManager;
    constructor(app: Application, controllerManager: ControllersManager);
    loadRoutes: () => void;
    private setupParentRouter;
    private setupChildRouter;
}
