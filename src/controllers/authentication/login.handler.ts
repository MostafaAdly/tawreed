import AuthenticationController from "./auth.controller";
import { Request, Response } from "express";

export default class LoginHandler extends AuthenticationController {
    login = {
        'GET': (req: Request, res: Response) => {
            res.send('Login GET Handler');
        },
        'POST': (req: Request, res: Response) => {
            res.send('Login POST Handler');
        }
    }
}