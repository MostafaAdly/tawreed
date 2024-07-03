"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthenticationMiddleware {
    constructor() {
        this.authenticate = (req, res, next) => {
            const token = req.headers['authorization'];
            if (!token) {
                return res.status(403).send({ auth: false, message: 'No token provided.' });
            }
            this.verify(token, req, res, next);
        };
        this.verify = (token, req, res, next) => {
            jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (err) {
                    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
                }
                req['userId'] = decoded.id;
                next();
            });
        };
    }
}
exports.default = AuthenticationMiddleware;
//# sourceMappingURL=auth.middleware.js.map