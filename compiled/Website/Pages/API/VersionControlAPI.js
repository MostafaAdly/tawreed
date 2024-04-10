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
            this.pull();
            const version = "fs.readFileSync(path.join(__dirname, '../../../../version.txt'), 'utf8');";
            res.status(200).json({ version });
        });
    }
    pull() {
        (0, child_process_1.exec)('mkdir ____________test', (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err);
            }
            else {
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        });
    }
}
VersionControlAPI.base_url = "/live";
exports.default = VersionControlAPI;
