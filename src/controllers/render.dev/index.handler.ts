import { Request, Response } from "express";
import NextServerManager from "src/next";
import RenderController from "./render.controller";

export default class IndexRenderHandler extends RenderController {
    index = {
        'GET': async (req: Request, res: Response, page: string) => {
            NextServerManager.render({ req, res, page })
        }
    }
}