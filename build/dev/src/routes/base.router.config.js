"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("../controllers/base.controller");
const base_router_1 = __importDefault(require("./base.router"));
exports.default = {
    auth: new base_router_1.default({
        path: "/",
        controller: "auth",
        middlewares: [],
        routes: [
            new base_router_1.default({
                path: "/login",
                method: base_controller_1.HttpMethod.GET,
                handler: "login",
                middlewares: [],
                skipMiddlewares: [],
            }),
            new base_router_1.default({
                path: "/login",
                method: base_controller_1.HttpMethod.POST,
                handler: "login",
                middlewares: [],
                skipMiddlewares: [],
            }),
            new base_router_1.default({
                path: "/register",
                method: base_controller_1.HttpMethod.GET,
                handler: "register",
                middlewares: [],
                skipMiddlewares: [],
            }),
            new base_router_1.default({
                path: "/register",
                method: base_controller_1.HttpMethod.POST,
                handler: "register",
                middlewares: [],
                skipMiddlewares: [],
            }),
        ],
    }),
};
//# sourceMappingURL=base.router.config.js.map