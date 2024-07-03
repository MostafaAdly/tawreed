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
const database_1 = __importDefault(require("./database/database"));
const server_1 = __importDefault(require("./server"));
const logger_1 = __importDefault(require("./utils/logger"));
const minimist_1 = __importDefault(require("minimist"));
class Manager {
    constructor() {
        this.database = new database_1.default();
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            this.validateCommandArguments();
            yield this.initDatabase();
            if (!this.connected) {
                return;
            }
            if (this.runMigrations) {
                this.runDatabaseMigrations();
                if (!this.regularStartup) {
                    return;
                }
            }
            this.initServer();
        });
        this.validateCommandArguments = () => {
            const args = (0, minimist_1.default)(process.argv.slice(2));
            this.runMigrations = args.migrate;
            this.regularStartup = args.start || !args.migrate;
        };
        this.initServer = () => {
            logger_1.default.log("Server initialized");
            const server = new server_1.default();
            server.startServer();
        };
        this.initDatabase = () => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.log("Database initialized");
            this.connected = yield this.database.connect();
        });
        this.runDatabaseMigrations = () => __awaiter(this, void 0, void 0, function* () {
            yield this.database.runMigrations();
        });
    }
}
exports.default = Manager;
//# sourceMappingURL=Manager.js.map