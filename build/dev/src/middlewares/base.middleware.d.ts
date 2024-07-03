import type { RequestHandler } from "express";
export default class BaseMiddleware {
    baseMiddleware: RequestHandler;
}
