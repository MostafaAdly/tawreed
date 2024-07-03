"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("./auth.controller"));
class LoginHandler extends auth_controller_1.default {
    constructor() {
        super(...arguments);
        this.login = {
            'GET': (req, res) => {
                res.send('Login GET Handler');
            },
            'POST': (req, res) => {
                res.send('Login POST Handler');
            }
        };
    }
}
exports.default = LoginHandler;
//# sourceMappingURL=login.handler.js.map