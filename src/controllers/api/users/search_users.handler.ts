import { Request, Response } from "express";
import UsersAPIController from "./users_api.controller";
import InfraResponse from "src/controllers/base/response";
import UsersService from "src/services/users.service";

export default class EditHandler extends UsersAPIController {
    search = {
        'GET': async (req: Request, res: Response) => {
            const { email, phone, username, type } = req.query;
            const users = await UsersService.getUsers({ email, phone, username, type } as { [key: string]: string });
            return InfraResponse.send(res, {
                statusCode: 200,
                message: `Found ${users.length} users.`,
                data: users,
            });
        }
    }
}