"use strict";
// ====================================================== [ Libraries ]
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
const Utils_1 = __importDefault(require("./Utils"));
const Server_1 = __importDefault(require("./Website/Server"));
// ====================================================== [ Boot Loader ]
class BootLoader {
    constructor(data) {
        this.load_utils = () => new Utils_1.default(this.data).initialize();
        this.data = data;
    }
    // =================== - Loading Methods - ===================
    load_Server() {
        const server = new Server_1.default(this.data);
        server.initialize();
        server.load_Middleware();
        server.load();
        server.listen();
        this.data.server = server;
    }
    start_database() {
        throw new Error("Method not implemented.");
    }
    load_GraphQl() {
    }
    load_Database() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = BootLoader;
