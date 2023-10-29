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
const departments_json_1 = __importDefault(require("../DefaultData/departments.json"));
const Department_1 = __importDefault(require("../Instances/Department"));
const User_1 = __importDefault(require("../Instances/User"));
class MongoDB {
    constructor(data) {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!process.env.MONGODB_CONNECTION_STRING)
                return;
            mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
                this.data.utils.print("Connected to MongoDB.");
            }).catch(() => this.data.utils.print("Failed to connect to MongoDB"));
        });
        this.disconnect = () => mongoose_1.default.disconnect();
        this.import_departments_intoMySQL = () => __awaiter(this, void 0, void 0, function* () {
            for (var departmentData of departments_json_1.default) {
                yield new Department_1.default(departmentData).save();
            }
            ;
        });
        this.deleteAllDepartments = () => __awaiter(this, void 0, void 0, function* () {
            yield Department_1.default.schema().deleteMany({});
        });
        this.deleteAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            yield User_1.default.schema().deleteMany({});
        });
        this.data = data;
    }
}
exports.default = MongoDB;
