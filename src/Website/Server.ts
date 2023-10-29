import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import Login from './Pages/Authentication/Login';
import Page from './Pages/Page';
import bodyParser from 'body-parser';
import Register from './Pages/Authentication/Register';
import SessionHandler from './SessionHandler';
import Home from './Pages/Home/Home';
import Logout from './Pages/Authentication/Logout';
import Departments from './Pages/Home/Departments';
import multer, { Multer } from 'multer'
import { v4 as uuid } from 'uuid'
import df from 'date-and-time';
import ImagesAPI from './Pages/API/ImagesAPI';
import Companies from './Pages/Home/Companies';

export default class Server {
    private data: any;
    private app: any;
    private port: number = parseInt(process.env.PORT + "") || 3000;
    private ttl: number = 14 * 24 * 60 * 60; // delete session after 14 days.
    public multer: Multer;
    public static api_base_url: string = "/api/v1";
    //
    private sessionHandler: SessionHandler;
    constructor(data: any) {
        this.data = data;
    }
    initialize() {
        this.app = express();
        this.app.set('view engine', 'ejs');
        this.sessionHandler = new SessionHandler(this.data);
        this.data.server = this;
        this.multer = multer({
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `views/LocalDatabase`)
                },
                filename: function (req, file, cb) {
                    const title = req.body.email ?? file.fieldname;
                    const fileType = file.mimetype.split("/")[file.mimetype.split("/").length - 1] ?? "png";
                    cb(null, `${df.format(new Date(), 'YYYY-MM-DD-HH-mm-ss')}_${uuid().split("-")[0]}_${title}.${fileType}`);
                }
            })
        });
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
        this.app.use(express.static('views/'));
        this.app.use((req: any, res: any, next: any) => this.sessionHandler.runMiddleware(req, res, next))
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
    private load_pages() {
        const pages: Page[] = [
            new Login(this.data),
            new Register(this.data),
            new Logout(this.data),

            // HOME
            new Home(this.data),
            new Departments(this.data),
            new Companies(this.data),
        ];

        for (let page of pages)
            this.app.use(page.base_url, page.router)
    }
    private load_apis() {

        const apis: Page[] = [

            new ImagesAPI(this.data, Server.api_base_url)

        ];
        for (let api of apis)
            this.app.use(api.base_url, api.router)
    }

    listen = () => this.app.listen(this.port, () => this.data.utils.print("Website is running on " + (this.port + "")["yellow"]))
}