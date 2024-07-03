import { Request, Response } from "express";
import ClientHomeController from "./client_home.controller";

export default class IndexHandler extends ClientHomeController {
    index = {
        'GET': async (req: Request, res: Response) => {
            res.send('Hello World');
        }
    }
}