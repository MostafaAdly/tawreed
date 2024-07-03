import { HttpMethod } from "../controllers/base.controller";
import Route from "./base.router";

export default {
    auth: new Route({
        path: "/",
        controller: "auth",
        middlewares: [],
        routes: [
            new Route({
                path: "/login",
                method: HttpMethod.GET,
                handler: "login",
                middlewares: [],
                skipMiddlewares: [],
            }),
            new Route({
                path: "/login",
                api: true,
                method: HttpMethod.POST,
                handler: "login",
                middlewares: [],
                skipMiddlewares: [],
            }),
            new Route({
                path: "/register",
                method: HttpMethod.GET,
                handler: "register",
                middlewares: [],
                skipMiddlewares: [],
            }),
            new Route({
                path: "/register",
                api: true,
                method: HttpMethod.POST,
                handler: "register",
                middlewares: [],
                skipMiddlewares: [],
            }),
        ],
    }),
    images: new Route({
        path: "/",
        controller: "images",
        middlewares: [],
        routes: [
            new Route({
                path: "/images/:filename",
                api: true,
                method: HttpMethod.GET,
                handler: "getImage",
                middlewares: [],
                skipMiddlewares: [],
            }),
        ]
    })
};
