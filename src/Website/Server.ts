import express from 'express';
import ejs from 'ejs'
import Login from './Pages/Authentication/Login';
import Page from './Pages/Page';
import bodyParser from 'body-parser';

export default class Server {
    private data: any;
    private app: any;
    private port: number = 3000;
    constructor(data: any) {
        this.data = data;
    }
    initialize() {
        this.app = express();
        this.app.set('view engine', 'ejs');
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.static('views'));
    }
    load_Middleware() {
        // throw new Error("Method not implemented.");
    }
    load() {
        this.load_pages();
        this.load_apis();

    }
    private load_pages() {
        const pages: Page[] = [
            new Login(this.data, "/login"),
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