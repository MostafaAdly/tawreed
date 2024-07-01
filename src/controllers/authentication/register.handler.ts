import AuthenticationController from "./auth.controller";
import { Request, Response } from "express";

export default class RegisterHandler extends AuthenticationController {
    register = {
        'GET': (req: Request, res: Response) => {
            res.send('Register GET Handler');
        },
        'POST': (req: Request, res: Response) => {
            res.send('Register POST Handler');
        }
    }
}