import { Request, Response } from "express";
import AdminHomeController from "./admin_home.controller";

export default class IndexHandler extends AdminHomeController {
    index = {
        'GET': async (req: Request, res: Response) => {
            res.send('Hello World');
        }
    }
}