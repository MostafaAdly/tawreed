"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
class VersionControlAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || VersionControlAPI.base_url);
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            const version = "fs.readFileSync(path.join(__dirname, '../../../../version.txt'), 'utf8');";
            res.status(200).json({ version });
        });
    }
}
VersionControlAPI.base_url = "/live";
exports.default = VersionControlAPI;
