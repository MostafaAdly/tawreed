"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
const body_parser_1 = __importDefault(require("body-parser"));
const Register_1 = __importDefault(require("./Pages/Authentication/Register"));
const SessionHandler_1 = __importDefault(require("./SessionHandler"));
const Home_1 = __importDefault(require("./Pages/Home/Home"));
const Logout_1 = __importDefault(require("./Pages/Authentication/Logout"));
class Server {
    constructor(data) {
        this.port = parseInt(process.env.PORT + "") || 3000;
        this.ttl = 14 * 24 * 60 * 60; // delete session after 14 days.
        this.listen = () => this.app.listen(this.port, () => this.data.utils.print("Website is running on " + (this.port + "")["yellow"]));
        this.data = data;
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.app.set('view engine', 'ejs');
        this.sessionHandler = new SessionHandler_1.default(this.data);
        this.data.server = this;
    }
    load_Middleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, express_session_1.default)({
            secret: this.data.utils.createId(false, 3),
            saveUninitialized: false,
            resave: false,
            store: connect_mongo_1.default.create({
                mongoUrl: process.env.MONGODB_CONNECTION_STRING, ttl: this.ttl
            }),
        }));
        this.app.use(express_1.default.static('views/'));
        this.app.use((req, res, next) => this.sessionHandler.runMiddleware(req, res, next));
    }
    load() {
        // LOADING PAGES
        this.load_pages();
        // LOADING APIS
        this.load_apis();
    }
    load_pages() {
        const pages = [
            new Login_1.default(this.data),
            new Register_1.default(this.data),
            new Logout_1.default(this.data),
            // HOME
            new Home_1.default(this.data)
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
