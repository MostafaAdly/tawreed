"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../controllers/base.controller");
class Route {
    constructor(data) {
        this.path = "/";
        this.method = base_controller_1.HttpMethod.GET;
        this.controller = "";
        this.handler = "";
        this.middlewares = [];
        this.skipMiddlewares = [];
        this.routes = [];
        this.setupChildrenRoutes = () => {
            for (let route of this.routes) {
                route.controller = this.controller;
                route.setupChildrenRoutes();
            }
        };
        Object.assign(this, data);
        this.setupChildrenRoutes();
    }
}
exports.default = Route;
//# sourceMappingURL=base.router.js.map