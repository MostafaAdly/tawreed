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
const Department_1 = __importDefault(require("../../../Instances/Department"));
const Page_1 = __importDefault(require("../Page"));
class Departments extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Departments.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const departments = yield Department_1.default.schema().find({});
            const user = req.session.user;
            res.render('Home/departments', { project_name: this.data.project_name, departments, user });
        }));
    }
}
Departments.base_url = "/departments";
exports.default = Departments;
