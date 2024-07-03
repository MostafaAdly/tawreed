import type { Application, RequestHandler } from "express";
import express from 'express';

export default class BaseMiddleware {
    baseMiddleware: RequestHandler = (req, res, next) => {
        next();
    }

    static setupDefaultMiddlewares = (app: Application) => {
        // app.use(bodyParser.urlencoded({ extended: false }))
        // app.use(bodyParser.json())
        app.use(express.json());
    }
}
