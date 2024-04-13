"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// ========================================================= [ Libraries ]
const colors_1 = __importDefault(require("colors"));
const date_and_time_1 = __importDefault(require("date-and-time"));
const uuid_1 = require("uuid");
// ========================================================= [ Global ]
class Global {
    constructor(data) {
        this.utils = {};
        data.utils = this.utils;
    }
    initialize() {
        this.utils.print = (msg, name = "Global") => console.log(`${name
            ? this.countSpaces("", 3) +
                colors_1.default.cyan("[" + name + "]") +
                this.countSpaces(name, 10)
            : ""}${date_and_time_1.default.format(new Date(), 'ddd hh:mm:ss A')} - ${msg}`);
        this.utils.line = (name) => this.utils.print(`--------- ${colors_1.default.red(name)} ---------`, name);
        this.utils.error = (msg, name) => this.utils.print(colors_1.default.red(msg), name);
        this.utils.createId = (removeSplits = false, repeat = 1) => {
            let id = "";
            for (let i = 0; i < repeat; i++)
                id += (0, uuid_1.v4)().replace("-", removeSplits ? "" : "-");
            return id;
        };
    }
    countSpaces(word = "", amount = 0) {
        let whiteSpaces = "";
        for (let i = 0; i < Math.abs(amount - word.length); i++)
            whiteSpaces += " ";
        return whiteSpaces;
    }
}
_a = Global;
Global.id_suffix = "";
Global.productId_prefix = "PID" + _a.id_suffix;
Global.userId_prefix = "UID" + _a.id_suffix;
Global.entityId_prefix = "EID" + _a.id_suffix;
Global.entityCategoryId_prefix = "ECID" + _a.id_suffix;
Global.departmentId_prefix = "DID" + _a.id_suffix;
Global.roleId_prefix = "RID" + _a.id_suffix;
Global.personaId_prefix = "PSID" + _a.id_suffix;
Global.commentId_prefix = "CID" + _a.id_suffix;
Global.requestId_prefix = "RID" + _a.id_suffix;
Global.paymentId_prefix = "PYID" + _a.id_suffix;
Global.createId = () => (0, uuid_1.v4)().split("-")[0];
Global.createToken = () => (0, uuid_1.v4)().replaceAll("-", "");
exports.default = Global;
