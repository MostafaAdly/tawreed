import NextServerManager from "src/next";
import AuthenticationController from "./auth.controller";
import { Request, Response } from "express";
import UsersService from "src/services/users.service";
import InfraResponse from "../infrastructure/Response";

export default class LoginHandler extends AuthenticationController {
    login = {
        'GET': (req: Request, res: Response) => {
            NextServerManager.render({ req, res, page: '/authentication/login', data: {} });
        },
        'POST': async (req: Request, res: Response) => {
            const { email, password } = req.body || {};
            const user = await UsersService.getUserByEmail(email);
            if (!user) {
                return InfraResponse.send(res, {
                    statusCode: 404,
                    message: 'User not found',
                    error: true
                });
            }
            const isPasswordValid = this.checkPassword(user, password);
            if (!isPasswordValid) {
                return InfraResponse.send(res, {
                    statusCode: 401,
                    message: 'Invalid password',
                    error: true
                });
            }
            return InfraResponse.send(res, {
                statusCode: 200,
                message: 'Login successful',
                error: false,
                data: user
            });
        }
    }
}