import express from 'express';
import session from 'express-session'
import MongoStore from 'connect-mongo'
import ejs from 'ejs'
import Login from './Pages/Authentication/Login';
import Page from './Pages/Page';
import bodyParser from 'body-parser';
import Register from './Pages/Authentication/Register';
import SessionHandler from './SessionHandler';
import Home from './Pages/Home/Home';
import Logout from './Pages/Authentication/Logout';

export default class Server {
    private data: any;
    private app: any;
    private port: number = parseInt(process.env.PORT + "") || 3000;
    private ttl: number = 14 * 24 * 60 * 60; // delete session after 14 days.
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
            new Home(this.data)
        ];

        for (let page of pages)
            this.app.use(page.base_url, page.router)
    }
    private load_apis() {
        const apis: Page[] = [];
        for (let api of apis)
            this.app.use(api.base_url, api.router)
    }

    listen = () => this.app.listen(this.port, () => this.data.utils.print("Website is running on " + (this.port + "")["yellow"]))
}