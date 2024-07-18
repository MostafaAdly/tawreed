import { Request, Response } from "express";
import HomeController from "./home.controller";
import InfraResponse from "../infrastructure/response";

export default class HomeIndexHandler extends HomeController {
  index = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      if (!user || !user.type)
        return InfraResponse.redirect(res, '/login');
      InfraResponse.redirect(res, `/${user.type.toLowerCase()}`);
    }
  }
}