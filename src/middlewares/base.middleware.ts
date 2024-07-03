import type { Application, RequestHandler } from "express";
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import Helpers from "src/utils/helpers";

export default class BaseMiddleware {
    baseMiddleware: RequestHandler = (req, res, next) => {
        next();
    }

    static setupDefaultMiddlewares = (app: Application) => {
        // app.use(bodyParser.urlencoded({ extended: false }))
        // app.use(bodyParser.json())
        app.use(express.json());
        app.use(cookieParser());
        app.use(session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: Helpers.isEnvProduction() }
        }));
    }
}
