import { HttpMethod } from "../controllers/base.controller";
import Route from "./base.router";

export default {
    users: new Route({
        path: "/users",
        controller: "users_api",
        api: true,
        routes: [
            new Route({ // /api/v1/users/edit
                path: "/",
                method: HttpMethod.GET,
                handler: "search",
            }),
        ]
    }),
    dashboard: new Route({
        path: "/",
        middlewares: [],
        routes: [
            new Route({
                path: "/admin",
                controller: "admin_home",
                routes: [
                    new Route({ // /admin
                        path: '/',
                        method: HttpMethod.GET,
                        handler: "index",
                        render: "admin/home/_index",
                    }),
                    new Route({ // /admin/users
                        path: '/users',
                        method: HttpMethod.GET,
                        routes: [
                            new Route({ // /admin/users/edit
                                path: '/',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/users/_index",
                            }),
                            new Route({ // /admin/users/new-client
                                path: '/new',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/users/new",
                            }),
                        ]
                    }),
                    new Route({
                        path: '/rfqs',
                        controller: "rfqs",
                        routes: [
                            new Route({ // /admin/rfqs
                                path: '/',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/rfqs/_index",
                            }),
                            new Route({ // /admin/rfqs/requests
                                path: '/requests',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/rfqs/requests",
                            }),
                            new Route({ // /admin/rfqs/offers
                                path: '/offers',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/rfqs/offers",
                            }),
                        ]
                    })
                ]
            }),
            new Route({
                path: "/client",
                controller: "client_home",
                routes: [
                    new Route({ // /client
                        path: "/",
                        method: HttpMethod.GET,
                        handler: "index",
                        render: "client/home/_index",
                    }),
                    new Route({ // /client/rfqs
                        path: "/rfqs",
                        controller: "rfqs",
                        routes: [
                            new Route({
                                path: "/new", // /client/rfqs/new
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/rfqs/new",
                            }),
                            new Route({ // /client/rfqs/incoming
                                path: "/incoming",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/rfqs/incoming",
                            }),
                            new Route({ // /client/rfqs/outgoing
                                path: "/outgoing",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/rfqs/outgoing",
                            }),
                            new Route({ // /client/rfqs/history
                                path: "/history",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/rfqs/history",
                            }),
                        ]
                    })
                ]
            }),
            new Route({
                path: "/supplier",
                controller: "supplier_home",
                routes: [
                    new Route({ // /supplier
                        path: "/",
                        method: HttpMethod.GET,
                        handler: "index",
                        render: "supplier/home/_index",
                    }),
                    new Route({
                        path: "/rfqs",
                        controller: "rfqs",
                        routes: [
                            new Route({ // /supplier/rfqs/incoming
                                path: "/incoming",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/rfqs/incoming",
                            }),
                            new Route({ // /supplier/rfqs/outgoing
                                path: "/outgoing",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/rfqs/outgoing",
                            }),
                            new Route({ // /supplier/rfqs/completed
                                path: "/completed",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/rfqs/completed",
                            }),
                            new Route({ // /supplier/rfqs/in-progress
                                path: "/in-progress",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/rfqs/in-progress",
                            }),
                            new Route({ // /supplier/rfqs/waiting
                                path: "/waiting",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/rfqs/waiting",
                            }),
                            new Route({ // /supplier/rfqs/edit/:id
                                path: "/edit/:id",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/rfqs/edit",
                            }),
                        ]
                    })
                ]
            }),
        ]
    }),
    auth: new Route({
        path: "/",
        controller: "auth",
        middlewares: [],
        routes: [
            new Route({
                path: "/login",
                method: HttpMethod.GET,
                handler: "login",
                render: "authentication/login",
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
