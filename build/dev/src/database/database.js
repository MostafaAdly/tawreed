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
const logger_1 = __importDefault(require("../utils/logger"));
const orm_config_1 = require("./orm.config");
class Database {
    constructor() {
        this.driver = "postgres";
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.createConnection();
                logger_1.default.log(`Connected to ${this.driver} database`);
                return true;
            }
            catch (error) {
                this.onError(error);
                return false;
            }
        });
        this.runMigrations = () => __awaiter(this, void 0, void 0, function* () {
            logger_1.default.log("Running database migrations");
            yield orm_config_1.AppDataSource.runMigrations();
            logger_1.default.log("Database migrations complete");
        });
        this.createConnection = () => __awaiter(this, void 0, void 0, function* () {
            orm_config_1.AppDataSource.initialize().catch((error) => this.onError(error));
        });
        this.disconnect = () => {
            logger_1.default.log(`Disconnected from ${this.driver} database`);
        };
        this.onError = (error) => {
            logger_1.default.error(`Error connecting to ${this.driver} database: ${error.message}`);
        };
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map