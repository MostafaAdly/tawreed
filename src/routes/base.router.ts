import { HttpMethod } from "../controllers/base.controller";

export default class Route {
    path: string = "/";
    method: HttpMethod = HttpMethod.GET;
    controller: string = "";
    handler: string = "";
    middlewares: string[] = [];
    skipMiddlewares: string[] = [];
    routes: Route[] = [];
    constructor(data: { path: string, method?: string, controller?: string, handler?: string, middlewares?: string[], skipMiddlewares?: string[], routes?: Route[] }) {
        Object.assign(this, data);
        this.setupChildrenRoutes();
    }

    setupChildrenRoutes = () => {
        for (let route of this.routes) {
            route.controller = this.controller;
            route.setupChildrenRoutes();
        }
    }
}