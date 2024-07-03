import { Request, Response } from "express";
import SupplierHomeController from "./supplier_home.controller";

export default class IndexHandler extends SupplierHomeController {
    index = {
        'GET': async (req: Request, res: Response) => {
            res.send('Hello World');
        }
    }
}