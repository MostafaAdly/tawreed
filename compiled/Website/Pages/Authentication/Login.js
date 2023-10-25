"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
class Login extends Page_1.default {
    constructor(data, base_url) {
        super(base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            res.render('Login/index', { project_name: this.data.project_name });
        });
    }
}
exports.default = Login;
