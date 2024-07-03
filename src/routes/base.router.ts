import Helpers from "src/utils/helpers";
import { HttpMethod } from "../controllers/base.controller";

export default class Route {
    path: string = "/";
    api: boolean = false;
    method: HttpMethod = HttpMethod.GET;
    controller?: string;
    render?: string;
    handler?: string;
    middlewares: string[] = [];
    skipMiddlewares: string[] = [];
    routes: Route[] = [];
    constructor(data: { path: string, api?: boolean, method?: string, controller?: string, render?: string, handler?: string, middlewares?: string[], skipMiddlewares?: string[], routes?: Route[] }) {
        data.path = data.api ? Helpers.getAPIVersion() + data.path : data.path;
        Object.assign(this, data);
    }

    setupChildrenRoutes = () => {
        for (let route of this.routes) {
            if (this.controller) {
                route.controller = this.controller;
            }
            route.path = Helpers.combinePaths(this.path, route.path);
            route.setupChildrenRoutes();
        }
    }
}