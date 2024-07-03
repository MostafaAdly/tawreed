import NextServerManager from "src/next";
import AuthenticationController from "./auth.controller";
import { Request, Response } from "express";

export default class LoginHandler extends AuthenticationController {
    login = {
        'GET': (req: Request, res: Response) => {
            NextServerManager.render({ req, res, page: '/authentication/login', data: {} });
        },
        'POST': (req: Request, res: Response) => {
            res.send('Login POST Handler');
        }
    }
}