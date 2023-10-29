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
const Departments_1 = __importDefault(require("./Pages/Home/Departments"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const date_and_time_1 = __importDefault(require("date-and-time"));
const ImagesAPI_1 = __importDefault(require("./Pages/API/ImagesAPI"));
const Companies_1 = __importDefault(require("./Pages/Home/Companies"));
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
        this.multer = (0, multer_1.default)({
            storage: multer_1.default.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `views/LocalDatabase`);
                },
                filename: function (req, file, cb) {
                    var _a, _b;
                    const title = (_a = req.body.email) !== null && _a !== void 0 ? _a : file.fieldname;
                    const fileType = (_b = file.mimetype.split("/")[file.mimetype.split("/").length - 1]) !== null && _b !== void 0 ? _b : "png";
                    cb(null, `${date_and_time_1.default.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}_${(0, uuid_1.v4)().split("-")[0]}_${title}.${fileType}`);
                }
            })
        });
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
        // this.app.use(fileUpload({
        //     useTempFiles: true,
        //     tempFileDir: '/TemporaryLocalDatabase'
        // }));
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
            new Home_1.default(this.data),
            new Departments_1.default(this.data),
            new Companies_1.default(this.data),
        ];
        for (let page of pages)
            this.app.use(page.base_url, page.router);
    }
    load_apis() {
        const apis = [
            new ImagesAPI_1.default(this.data, Server.api_base_url)
        ];
        for (let api of apis)
            this.app.use(api.base_url, api.router);
    }
}
Server.api_base_url = "/api/v1";
exports.default = Server;
