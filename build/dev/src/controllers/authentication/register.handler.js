"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("./auth.controller"));
class RegisterHandler extends auth_controller_1.default {
    constructor() {
        super(...arguments);
        this.register = {
            'GET': (req, res) => {
                res.send('Register GET Handler');
            },
            'POST': (req, res) => {
                res.send('Register POST Handler');
            }
        };
    }
}
exports.default = RegisterHandler;
//# sourceMappingURL=register.handler.js.map