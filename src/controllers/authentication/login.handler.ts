import AuthenticationController from "./auth.controller";
import { Request, Response } from "express";
import UsersService from "src/services/users.service";
import InfraResponse from "../infrastructure/response";
import { AccountType } from "src/config/enums/account.enum";

export default class LoginHandler extends AuthenticationController {
    login = {
        'GET': () => {
            // Handled by Automated Render.
        },
        'POST': async (req: Request, res: Response) => {
            const { email, password } = req.body || {};
            const user = await UsersService.getUserByEmail(email);
            if (!user) {
                2
                return InfraResponse.send(res, {
                    statusCode: 204,
                    message: 'User not found',
                    error: true
                });
            }
            const isPasswordValid = await this.checkPassword(user, password);
            if (!isPasswordValid) {
                return InfraResponse.send(res, {
                    statusCode: 201,
                    message: 'Invalid password',
                    error: true
                });
            }
            const isAPersonaAccount = Object.keys(AccountType).map((key) => key.toLowerCase()).includes(user.type.toLowerCase());
            if (!isAPersonaAccount) {
                return InfraResponse.send(res, {
                    statusCode: 201,
                    message: 'Invalid account type',
                    error: true
                });
            }
            if (!isPasswordValid) {
                return InfraResponse.send(res, {
                    statusCode: 201,
                    message: 'Invalid password',
                    error: true
                });
            }
            this.signAndCookie(res, { userId: user.id });
            this.storeInSession(req, user);
            // return InfraResponse.redirect(res, '/');
            return InfraResponse.send(res, {
                statusCode: 200,
                message: 'User authenticated',
                redirect: `/${user.type.toLowerCase()}`,
                data: { userId: user.id }
            });
        }
    }
}