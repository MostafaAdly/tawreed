"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
class ImagesAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || ImagesAPI.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/:id", (req, res) => {
            return res.send(`<img src="/LocalDatabase/asd.jpeg" alt="" />`);
        });
    }
}
ImagesAPI.base_url = "/api/v1/images";
exports.default = ImagesAPI;
