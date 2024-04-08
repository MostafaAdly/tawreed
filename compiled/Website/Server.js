"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
const body_parser_1 = __importDefault(require("body-parser"));
const SessionHandler_1 = __importDefault(require("./SessionHandler"));
const Home_1 = __importDefault(require("./Pages/Personas/Customer/Home/Home"));
const Logout_1 = __importDefault(require("./Pages/Authentication/Logout"));
const Departments_1 = __importDefault(require("./Pages/Personas/Customer/Department/Departments"));
const NextWildCard_1 = __importDefault(require("./Pages/WildCards/NextWildCard"));
const Supplier_1 = __importDefault(require("./Pages/Personas/Customer/Supplier/Supplier"));
const PersonaSelector_1 = __importDefault(require("./Pages/Personas/Selector/PersonaSelector"));
const MyCompany_1 = __importDefault(require("./Pages/Personas/Supplier/MyCompany"));
const MyProducts_1 = __importDefault(require("./Pages/Personas/Supplier/MyProducts"));
const ImagesAPI_1 = __importDefault(require("./Pages/API/ImagesAPI"));
const MyRequests_1 = __importDefault(require("./Pages/Personas/Supplier/MyRequests"));
const CustomerRequests_1 = __importDefault(require("./Pages/Personas/Customer/Profile/CustomerRequests"));
class Server {
    constructor(data) {
        this.port = parseInt(process.env.PORT + "") || 3000;
        this.ttl = 14 * 24 * 60 * 60; // delete session after 14 days.
        this.development = process.env.ENVIRONMENT != "production";
        // ============== - PUBLIC VARIABLES - ==============
        this.next = (0, next_1.default)({ dev: this.development });
        this.app = (0, express_1.default)();
        this.listen = () => this.app.listen(this.port, () => this.data.utils.print("Website is running on " + (this.port + "")["yellow"]));
        this.data = data;
        this.data.server = this;
        this.data.utils.print("Running in " + process.env.ENVIRONMENT.toUpperCase()[this.development ? "cyan" : "green"] + " mode.");
    }
    initialize() {
        this.sessionHandler = new SessionHandler_1.default(this.data);
        // this.multer = multer({
        //     storage: multer.diskStorage({
        //         destination: (req, file, cb) => {
        //             cb(null, `views/LocalDatabase`)
        //         },
        //         filename: (req: any, file, cb) => {
        //             const title = req.body.email ?? file.fieldname;
        //             const fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1] ?? "png";
        //             cb(null, `${df.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}_${uuid().split("-")[0]}_${title}.${fileType}`);
        //         }
        //     })
        // });
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
        // this.app.use("../../pages", express.static(__dirname));
    }
    load_Late_Middleware() {
        this.app.use((req, res, next) => this.sessionHandler.runMiddleware(req, res, next));
    }
    load() {
        this.next.prepare().then(() => {
            // Loading all late middlewares to be executed after the pages/apis are loaded.
            this.load_Late_Middleware();
            // Loading all available and working API for the upcoming loaded pages.
            this.load_apis();
            // Loading all available pages for  [ Development / Production ]
            this.load_pages();
            // Starting the server listener...
            this.listen();
        }).catch(console.error);
    }
    load_pages() {
        const pages = [
            // AUTHENTICATION
            new Login_1.default(this.data),
            new Logout_1.default(this.data),
            // PERSONA SELECTOR
            new PersonaSelector_1.default(this.data),
            // CUSTOMER
            new Home_1.default(this.data),
            new Departments_1.default(this.data),
            new Supplier_1.default(this.data),
            new CustomerRequests_1.default(this.data),
            // SUPPLIER
            new MyCompany_1.default(this.data),
            new MyProducts_1.default(this.data),
            new MyRequests_1.default(this.data),
            // Do not remove this.
            new NextWildCard_1.default(this.data),
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
