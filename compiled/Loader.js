"use strict";
// ====================================================== [ Libraries ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("./Utils"));
const Server_1 = __importDefault(require("./Website/Server"));
const departments_json_1 = __importDefault(require("./DefaultData/departments.json"));
// ====================================================== [ Boot Loader ]
class BootLoader {
    constructor(data) {
        this.load_utils = () => new Utils_1.default(this.data).initialize();
        this.load_departments = () => {
            this.data.departments = Object.keys(departments_json_1.default);
        };
        this.data = data;
    }
    // =================== - Loading Methods - ===================
    load_Server() {
        const server = new Server_1.default(this.data);
        server.initialize();
        server.load_Middleware();
        server.load();
        this.data.server = server;
    }
}
exports.default = BootLoader;
