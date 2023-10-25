"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
class Server {
    constructor(data) {
        this.port = 3000;
        this.listen = () => this.app.listen(this.port, () => this.data.utils.print("Website is running on " + (this.port + "")["yellow"]));
        this.data = data;
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.app.set('view engine', 'ejs');
        // this.app.use(express.static('public'));
    }
    load_Middleware() {
        // throw new Error("Method not implemented.");
    }
    load() {
        this.load_pages();
        this.load_apis();
    }
    load_pages() {
        const pages = [
            new Login_1.default(this.data, "/login"),
        ];
        for (let page of pages)
            this.app.use(page.base_url, page.router);
    }
    load_apis() {
        const apis = [];
        for (let api of apis)
            this.app.use(api.base_url, api.router);
    }
}
exports.default = Server;
