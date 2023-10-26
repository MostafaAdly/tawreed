"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
class Home extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Home.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get('/', (req, res) => {
            res.render('Home/index', { project_name: this.data.project_name });
        });
    }
}
Home.base_url = "/home";
exports.default = Home;
