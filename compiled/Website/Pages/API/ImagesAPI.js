"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const stream_1 = __importDefault(require("stream"));
class ImagesAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || ImagesAPI.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/images/:id", (req, res) => {
            const id = req.params.id;
            const ps = new stream_1.default.PassThrough();
            stream_1.default.pipeline(fs_1.default.createReadStream(path_1.default.join(__dirname, `../../../../LocalDatabase/images/${id}`)), ps, (err) => {
                if (err)
                    return res.sendStatus(400);
            });
            ps.pipe(res);
        });
    }
}
ImagesAPI.base_url = "/images";
exports.default = ImagesAPI;
