import Route from "../routes/base.router";
import { ControllerConfig } from "./base.controller";
export default class ControllersManager {
    controllers: Map<string, ControllerConfig>;
    private controllerSuffix;
    private handlerSuffix;
    private controllersDirectory;
    constructor();
    setupControllers(): void;
    getHandlerByRoute: (route: Route) => Function | null;
    private loadController;
    private loadControllerHandlers;
    private loadHandler;
}
