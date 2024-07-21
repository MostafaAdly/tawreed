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
                            new Route({ // /api/v1/posts/offers
                                path: '/',
                                method: HttpMethod.POST,
                                handler: "search",
                            }),
                            new Route({ // /api/v1/posts/offers/:offerId
                                path: '/',
                                method: HttpMethod.PUT,
                                handler: "edit",
                                dto: "new_offer_response",
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
                        path: '/posts',
                        routes: [
                            new Route({ // /admin/posts
                                path: '/',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/posts/_index",
                            }),
                            new Route({ // /admin/posts/requests
                                path: '/requests',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/posts/requests",
                            }),
                            new Route({ // /admin/posts/offers
                                path: '/offers',
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "admin/posts/offers",
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
                    new Route({ // /client/posts
                        path: "/posts",
                        routes: [
                            new Route({
                                path: "/new", // /client/posts/new
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/posts/new",
                            }),
                            new Route({ // /client/posts/incoming
                                path: "/incoming",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/posts/incoming",
                            }),
                            new Route({ // /client/posts/outgoing
                                path: "/outgoing",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/posts/outgoing",
                            }),
                            new Route({ // /client/posts/history
                                path: "/history",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "client/posts/history",
                            }),
                        ]
                    })
                ]
            }),
            new Route({
                path: "/supplier",
                routes: [
                    new Route({ // /supplier
                        path: "/",
                        controller: "supplier_home",
                        routes: [
                            new Route({
                                path: "/",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/home/_index",
                            })
                        ]
                    }),
                    new Route({
                        path: "/posts",
                        controller: "supplier_offers",
                        routes: [
                            new Route({ // /supplier/posts/incoming
                                path: "/incoming",
                                method: HttpMethod.GET,
                                handler: "incoming",
                            }),
                            new Route({ // /supplier/posts/edit/:id
                                path: "/edit/:offerId",
                                method: HttpMethod.GET,
                                handler: "edit",
                            }),
                            new Route({ // /supplier/posts/in-progress
                                path: "/in-progress",
                                method: HttpMethod.GET,
                                handler: "inProgress",
                            }),
                            new Route({ // /supplier/posts/outgoing
                                path: "/outgoing",
                                method: HttpMethod.GET,
                                handler: "index",
                            }),
                            new Route({ // /supplier/posts/completed
                                path: "/completed",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/posts/completed",
                            }),
                            new Route({ // /supplier/posts/waiting
                                path: "/waiting",
                                method: HttpMethod.GET,
                                handler: "index",
                                render: "supplier/posts/waiting",
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
