"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Loader_1 = __importDefault(require("./Loader"));
const dotenv_1 = require("dotenv");
class Manager {
    constructor() {
        this.data = { project_name: "iSupplier" };
        this.loader = new Loader_1.default(this.data);
        (0, dotenv_1.config)();
    }
    init() {
        this.loader.load_utils();
        this.loader.load_Server();
    }
    startDataBase() {
        this.loader.start_database();
    }
}
exports.default = Manager;
// STARTER
const starter = new Manager();
starter.init();
