import jwt from 'jsonwebtoken';
import { NextFunction, RequestHandler, Request, Response } from "express";

export default class AuthenticationMiddleware {

    authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        console.log(req['session'])
        if (req['session'].userId) {
            next();
        } else {
            this.authenticateJWT(req, res, next);
        }
    }

    authenticateSession: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        if (req['session'].userId) {
            next()
        } else {
            res.redirect('/login')
        }
    }

    authenticateJWT: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies['token'];
        if (!token) {
            return res.redirect('/login');
        }
        this.verify(token, req, res, next);
    }

    private verify = (token: string, req: Request, res: Response, next: NextFunction) => {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
            }
            req['userId'] = decoded.id
            // req['token'] = token
            next();
        })
    }
}