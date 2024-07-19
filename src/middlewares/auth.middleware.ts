import jwt from 'jsonwebtoken';
import { NextFunction, RequestHandler, Request, Response } from "express";
import InfraResponse from 'src/controllers/infrastructure/response';

export default class AuthenticationMiddleware {

    revertBack: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        if (this._isValidSession(req)) {
            res.redirect('/')
        } else {
            next();
        }
    }

    authenticateSession: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        if (this._isValidSession(req)) {
            next()
        } else {
            res.redirect('/login')
        }
    }

    authenticateJWT: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies['token'];
        if (!token) {
            return InfraResponse.send(res, { statusCode: 401, message: 'Unauthorized: Failed to authenticate token.', error: true });
        }
        this._verify(token, req, res, next);
    }

    private _verify = (token: string, req: Request, res: Response, next: NextFunction) => {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err)
                return InfraResponse.send(res, { statusCode: 500, message: 'Failed to authenticate token.', error: true });
            req['userId'] = decoded.id
            next();
        })
    }

    private _isValidSession = (req: Request) => {
        return req['session'].user;
    }

    static _destroySession = (req: Request) => {
        if (req['session'])
            req['session'].destroy((err) => {
                if (err) console.log(err);
            });
    }
}