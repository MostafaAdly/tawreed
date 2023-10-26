"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const Login_1 = __importDefault(require("./Login"));
class Logout extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Logout.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            this.data.server.sessionHandler.removeSessionIfExists(req);
            res.redirect(Login_1.default.base_url);
        });
    }
}
Logout.base_url = "/logout";
exports.default = Logout;
