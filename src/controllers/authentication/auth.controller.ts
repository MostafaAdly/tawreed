import User from 'src/database/models/user.model';
import BaseController from '../base.controller';
import bcrypt from 'bcrypt';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import Helpers from 'src/utils/helpers';

export default class AuthenticationController extends BaseController {

    checkPassword = (user: User, password: string) => {
        return bcrypt.compare(password, user?.hashed_password);
    }

    signAndCookie = (res: Response, user: unknown) => {
        const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1800s' });
        res.cookie('token', token, { httpOnly: true, secure: Helpers.isEnvProduction() });
    }
}