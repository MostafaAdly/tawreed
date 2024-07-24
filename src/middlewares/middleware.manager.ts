import { Application, RequestHandler } from "express";
import fs from 'fs';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';

export default class MiddlewareManager {
  middlewares: { [key: string]: RequestHandler } = {};

  getMiddlewares = (middlewares: string[]): RequestHandler[] => {
    return middlewares.map((middleware: string) => this.middlewares[middleware]);
  }

  setupDefaultMiddlewares = (app: Application) => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
      // cookie: { secure: Helpers.isEnvProduction() }
    }));
  }

  loadMiddlewares = () => {
    // Load all middlewares here
    fs.readdirSync(__dirname).filter(file => !['base.middleware.ts', 'middleware.manager.ts'].includes(file)).forEach(file => {
      const middleware = new (require(`./${file}`).default)();
      Object.entries(middleware).filter(([key, value]) => !key.startsWith('_')).map(([key, value]) => {
        this.middlewares[key] = value as RequestHandler;
      });
    });
  }
}