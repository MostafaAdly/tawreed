"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultProfilePicture_json_1 = __importDefault(require("../DefaultData/defaultProfilePicture.json"));
const path_1 = __importDefault(require("path"));
class ImageURL {
    constructor(file_destination) {
        this.url = file_destination ? path_1.default.relative(path_1.default.join(process.cwd(), "/views"), file_destination) : undefined;
    }
    getURL() {
        return this.url ? (`${this.url}`).replace("\\", "/") : defaultProfilePicture_json_1.default.image;
    }
}
exports.default = ImageURL;
