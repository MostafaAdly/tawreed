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
const axios_1 = __importDefault(require("axios"));
const Page_1 = __importDefault(require("../Page"));
class RegisterAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || RegisterAPI.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.post("/register", (req, res) => {
        });
    }
    handleUserImage(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.get(url, { responseType: 'arraybuffer' });
            console.log(response);
        });
    }
}
RegisterAPI.base_url = "/api/v1/auth";
exports.default = RegisterAPI;
