"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImagesAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + ImagesAPI.base_url);
        this.run();
    }
    run() {
        this.router.get("/:path", (req, res) => {
            const imagePath = path_1.default.join(process.cwd(), `/LocalDatabase/images/${req.params.path}`);
            if (fs_1.default.existsSync(imagePath)) {
                res.sendFile(imagePath);
            }
            else
                res.json({ error: "Image not found." });
        });
    }
}
ImagesAPI.base_url = "/images";
exports.default = ImagesAPI;
