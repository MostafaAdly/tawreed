"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const child_process_1 = require("child_process");
class VersionControlAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + VersionControlAPI.base_url);
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            (0, child_process_1.exec)(`git pull ${process.env.GITHUB_REPOSITORY}`, (err, stdout, stderr) => {
                res.status(200).json({ err, stdout, stderr });
            });
        });
    }
}
VersionControlAPI.base_url = "/live";
exports.default = VersionControlAPI;
