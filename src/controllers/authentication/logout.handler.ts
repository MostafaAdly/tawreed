import { Request, Response } from "express";
import AuthenticationController from "./auth.controller";
import AuthenticationMiddleware from "src/middlewares/auth.middleware";
import InfraResponse from "../infrastructure/response";

export default class LogoutHandler extends AuthenticationController {
  logout = {
    'GET': async (req: Request, res: Response) => {
      AuthenticationMiddleware._destroySession(req);
      return InfraResponse.redirect(res, '/login');
    }
  }
}