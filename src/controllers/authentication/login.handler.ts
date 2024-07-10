import AuthenticationController from "./auth.controller";
import { Request, Response } from "express";
import UsersService from "src/services/users.service";
import InfraResponse from "../infrastructure/response";

export default class LoginHandler extends AuthenticationController {
    login = {
        'GET': () => {
            // Handled by Automated Render.
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
            this.signAndCookie(res, { userId: user.id });
            // return InfraResponse.redirect(res, '/');
            return InfraResponse.send(res, {
                statusCode: 200,
                message: 'User authenticated',
                data: { userId: user.id }
            });
        }
    }
}