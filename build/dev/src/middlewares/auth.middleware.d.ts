import { RequestHandler } from "express";
export default class AuthenticationMiddleware {
    authenticate: RequestHandler;
    private verify;
}
