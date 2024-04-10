import express from 'express';
import next from 'next';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import Login from './Pages/Authentication/Login';
import Page from './Pages/Page';
import bodyParser from 'body-parser';
import SessionHandler from './SessionHandler';
import Home from './Pages/Personas/Customer/Home/Home';
import Logout from './Pages/Authentication/Logout';
import Departments from './Pages/Personas/Customer/Department/Departments';
import multer, { Multer } from 'multer'
import df from 'date-and-time'
import { NextServer } from 'next/dist/server/next';
import { v4 as uuid } from 'uuid';
import WildCard from './Pages/WildCards/NextWildCard';
import Supplier from './Pages/Personas/Customer/Supplier/Supplier';
import PersonaSelector from './Pages/Personas/Selector/PersonaSelector';
import MyCompany from './Pages/Personas/Supplier/MyCompany';
import MyProducts from './Pages/Personas/Supplier/MyProducts';
import ImagesAPI from './Pages/API/ImagesAPI';
import MyRequests from './Pages/Personas/Supplier/MyRequests';
import CustomerRequests from './Pages/Personas/Customer/Profile/CustomerRequests';
import VersionControlAPI from './Pages/API/VersionControlAPI';

export default class Server {
    // ============== - PRIVATE VARIABLES - ==============
    private data: any;
    private port: number = parseInt(process.env.SERVER_PORT + "") || 3000;
    private ttl: number = 14 * 24 * 60 * 60; // delete session after 14 days.
    private sessionHandler: SessionHandler;
    private development: boolean = process.env.ENVIRONMENT != "production";
    // ============== - PUBLIC VARIABLES - ==============
    public next: NextServer = next({ dev: this.development });
    public static api_base_url: string = "/api/v1";
    public app: any = express();
    public multer: Multer;

    constructor(data: any) {
        this.data = data;
        this.data.server = this;
        this.data.utils.print("Running in " + (process.env.ENVIRONMENT as String).toUpperCase()[this.development ? "cyan" : "green"] + " mode.");
    }
    initialize() {
        this.sessionHandler = new SessionHandler(this.data);
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
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(session({
            secret: this.data.utils.createId(false, 3),
            saveUninitialized: false,
            resave: false,
            store: MongoStore.create({
                mongoUrl: process.env.MONGODB_CONNECTION_STRING, ttl: this.ttl
            }),
        }));
        // this.app.use("../../pages", express.static(__dirname));
    }
    load_Late_Middleware() {
        this.app.use((req: any, res: any, next: any) => this.sessionHandler.runMiddleware(req, res, next));
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
    private load_pages() {
        const pages: Page[] = [

            // AUTHENTICATION
            new Login(this.data),
            new Logout(this.data), // API CALL

            // PERSONA SELECTOR
            new PersonaSelector(this.data),

            // CUSTOMER
            new Home(this.data),
            new Departments(this.data),
            new Supplier(this.data),
            new CustomerRequests(this.data),

            // SUPPLIER
            new MyCompany(this.data),
            new MyProducts(this.data),
            new MyRequests(this.data),

            // Do not remove this.
            new WildCard(this.data),
        ];

        for (let page of pages)
            this.app.use(page.base_url, page.router)
    }
    private load_apis() {

        const apis: Page[] = [

            new ImagesAPI(this.data, Server.api_base_url),
            new VersionControlAPI(this.data, Server.api_base_url)

        ];
        for (let api of apis)
            this.app.use(api.base_url, api.router)
    }

    listen = () => this.app.listen(this.port, () => this.data.utils.print("Website is running on " + (this.port + "")["yellow"]))
}