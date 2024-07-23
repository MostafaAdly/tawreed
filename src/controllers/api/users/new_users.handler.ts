import { Request, Response } from "express";
import InfraResponse from "src/controllers/base/response";
import UsersAPIController from "./users_api.controller";
import UsersService from "src/services/users.service";

export default class UsersCreationHandler extends UsersAPIController {

  createClient = {
    'POST': async (req: Request, res: Response) => {
      var user = await UsersService.getUserByEmail(req.body.email);
      if (user)
        return InfraResponse.send(res, {
          statusCode: 400,
          message: "User:client already exists.",
          error: true
        });
      user = await UsersService.createClient(req.body);
      if (!user)
        return InfraResponse.send(res, {
          statusCode: 400,
          message: "User:client creation failed.",
          error: true
        })
      delete user.hashed_password;
      return InfraResponse.send(res, {
        statusCode: 200,
        message: "User:client created successfully.",
        data: { user }
      })
    }
  }
  createSupplier = {
    'POST': async (req: Request, res: Response) => {
      var user = await UsersService.getUserByEmail(req.body.email);
      if (user)
        return InfraResponse.send(res, {
          statusCode: 400,
          message: "User:supplier already exists.",
          error: true
        });
      user = await UsersService.createSupplier(req.body);
      if (!user)
        return InfraResponse.send(res, {
          statusCode: 400,
          message: "User:supplier creation failed.",
          error: true
        })
      delete user.hashed_password;
      return InfraResponse.send(res, {
        statusCode: 200,
        message: "User:supplier created successfully.",
        data: { user }
      })
    }
  }
}