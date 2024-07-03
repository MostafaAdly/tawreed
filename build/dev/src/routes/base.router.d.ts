import { HttpMethod } from "../controllers/base.controller";
export default class Route {
    path: string;
    method: HttpMethod;
    controller: string;
    handler: string;
    middlewares: string[];
    skipMiddlewares: string[];
    routes: Route[];
    constructor(data: {
        path: string;
        method?: string;
        controller?: string;
        handler?: string;
        middlewares?: string[];
        skipMiddlewares?: string[];
        routes?: Route[];
    });
    setupChildrenRoutes: () => void;
}
