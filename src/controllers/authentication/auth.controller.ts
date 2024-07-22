import User from 'src/database/models/user.model';
import BaseController from '../base/base.controller';
import bcrypt from 'bcrypt';
import { Response, Request } from 'express';
import jwt from 'jsonwebtoken';
export default class AuthenticationController extends BaseController {

    checkPassword = async (user: User, password: string) => {
        return await bcrypt.compare(password, user?.hashed_password);
    }

    signAndCookie = (res: Response, user: unknown): string => {
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s' });
        res.cookie('token', token, { httpOnly: true, secure: false });
        return token;
    }

    storeInSession = (req: Request, user: User) => {
        req['session'].user = user;
    }
}