"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Company_1 = __importDefault(require("../../../Instances/Company"));
const Page_1 = __importDefault(require("../Page"));
class Companies extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Companies.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // all companies
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const companies = yield Company_1.default.schema().find({});
            res.render('Home/Company/companies', { project_name: this.data.project_name, companies, user });
        }));
        // add company ( GET )
        this.router.get('/add', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            res.render('Home/Company/createCompany', { project_name: this.data.project_name, user });
        }));
        // add company ( POST )
        this.router.post('/add', this.data.server.multer.array("itemImagesInput"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.createNewCompany(req.body, req.files);
            res.status(200).redirect(`/companies`);
        }));
    }
    createNewCompany(data, images) {
        return __awaiter(this, void 0, void 0, function* () {
            new Company_1.default(data, images).save();
        });
    }
}
Companies.base_url = "/companies";
exports.default = Companies;
