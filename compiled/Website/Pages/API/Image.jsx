"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Image extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Image.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/:id", (req, res) => {
            const id = req.params.id;
            if (fs_1.default.existsSync(path_1.default.join(__dirname, `LocalDatabase/images/${id}`)))
                return res.sendFile(path_1.default.join(__dirname, `LocalDatabase/images/${id}`));
            return res.send("Image not found.");
        });
    }
}
Image.base_url = "/api/v1/images";
exports.default = Image;
