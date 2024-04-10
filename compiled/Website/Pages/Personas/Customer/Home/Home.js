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
const mongoose_1 = __importDefault(require("mongoose"));
const Page_1 = __importDefault(require("../../../Page"));
class Home extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Home.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // HOME PAGE
        this.router.get(['/', '/home'], (req, res) => __awaiter(this, void 0, void 0, function* () {
            const departments = yield mongoose_1.default.models.Department.find({});
            const user = req.session.user;
            this.data.server.next.render(req, res, '/Customer/Home/HomePage', { data: JSON.stringify({ departments, user }) });
        }));
    }
}
Home.base_url = "/c";
exports.default = Home;
