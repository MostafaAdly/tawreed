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
const Department_1 = __importDefault(require("../../../../../Instances/Department"));
const Page_1 = __importDefault(require("../../../Page"));
const mongoose_1 = __importDefault(require("mongoose"));
const Home_1 = __importDefault(require("../Home/Home"));
class Departments extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Departments.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // ALL DEPARTMENTS
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.status(200).redirect(Home_1.default.base_url + '#departments');
        }));
        // DEPARTMENT BY ID
        this.router.get('/:departmentId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const department = yield new Department_1.default().load({ departmentId: req.params.departmentId });
            if (!department) {
                //TODO: HANDLE DEPARTMENT IF NULL
                return;
            }
            const entities = yield mongoose_1.default.models.Entity.find({ "departments": { $elemMatch: { $eq: department._id } } });
            this.data.server.next.render(req, res, '/Customer/Department/DepartmentPage', { data: JSON.stringify({ department, entities, user }) });
        }));
    }
}
Departments.base_url = "/c/departments";
exports.default = Departments;
