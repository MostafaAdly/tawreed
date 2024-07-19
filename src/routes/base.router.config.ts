import { HttpMethod } from "../controllers/base/base.controller";
import Route from "./base.router";

export default {
    home: new Route({
        path: "/",
        controller: "home",
        middlewares: ['authenticateSession'],
        routes: [
            new Route({
                path: "/",
                method: HttpMethod.GET,
                handler: "index",
            }),
        ]
    }),
    api: new Route({
        path: '/',
        api: true,
        middlewares: ["authenticateJWT", "validateBody"],
        routes: [
            new Route({
                path: "/posts",
                middlewares: ['acceptFiles'],
                skipMiddlewares: ["authenticateJWT"], // TEMPORARY: REMOVE THIS LINE
                routes: [
                    new Route({ // /api/v1/posts
                        path: '/offers',
                        controller: "offers",
                        routes: [
                            new Route({
                                path: '/new',
                                method: HttpMethod.POST,
                                handler: "create",
                                dto: "new_offer",
                            }),
                            new Route({ // /api/v1/posts/offers
                                path: '/',
                                method: HttpMethod.GET,
                                handler: "search",
                            }),
                        ]
                    }),
                ]

            }),
            new Route({ // /api/v1/users/edit
                path: "/users",
                controller: "users_api",
                middlewares: ['authenticateJWT'],
                routes: [
                    new Route({
                        path: '/edit',
                        method: HttpMethod.GET,
                        handler: "search",
                    })
                ]
            }),
            new Route({
                path: "/images",
                controller: "images",
                skipMiddlewares: ["authenticateJWT"],
                routes: [
                    new Route({
                        path: "/:filename",
                        method: HttpMethod.GET,
                        handler: "getImage",
                    }),
                ]
            })
        ]
    }),
    dashboard: new Route({
        path: "/",
        middlewares: ['authenticateSession'],
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
                path: '/logout',
                method: HttpMethod.GET,
                handler: "logout",
            }),
            new Route({
                path: "/login",
                method: HttpMethod.GET,
                handler: "login",
                render: "authentication/login",
                middlewares: [
                    "revertBack",
                ],
            }),
            new Route({
                path: "/auth/login",
                api: true,
                method: HttpMethod.POST,
                handler: "login",
            }),
        ],
    }),
};
