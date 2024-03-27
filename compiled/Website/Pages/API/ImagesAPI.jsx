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
            // if (fs.existsSync(path.join(__dirname, `LocalDatabase/images/${id}`))) {
            //     // return res.sendFile(path.join(__dirname, `LocalDatabase/images/${id}`));
            // }       
            // return res.json({ error: "Image not found." });
            const r = fs_1.default.createReadStream(path_1.default.join(__dirname, `LocalDatabase/images/${id}`)); // or any other way to get a readable stream
            const ps = new stream_1.default.PassThrough(); // <---- this makes a trick with stream error handling
            stream_1.default.pipeline(r, ps, // <---- this makes a trick with stream error handling
            (err) => {
                if (err) {
                    console.log(err); // No such file or any other kind of error
                    return res.sendStatus(400);
                }
            });
            ps.pipe(res); // <---- this makes a trick with stream error handling
        });
    }
}
ImagesAPI.base_url = "/images";
exports.default = ImagesAPI;
