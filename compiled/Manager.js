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
const Loader_1 = __importDefault(require("./Loader"));
const dotenv_1 = require("dotenv");
const MongoDB_1 = __importDefault(require("./Database/MongoDB"));
class Manager {
    constructor() {
        this.data = { project_name: "Tawreed" };
        this.loader = new Loader_1.default(this.data);
        this.mongodb = new MongoDB_1.default(this.data);
        this.startDatabase = () => __awaiter(this, void 0, void 0, function* () { return yield this.mongodb.connect(); });
        (0, dotenv_1.config)();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loader.load_utils();
            this.loader.load_departments();
            this.loader.load_Server();
            yield this.startDatabase();
        });
    }
}
exports.default = Manager;
(() => __awaiter(void 0, void 0, void 0, function* () {
    // STARTER
    const starter = new Manager();
    starter.init();
}))();
