"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Page {
    constructor(...args) {
        this.router = (0, express_1.Router)();
        if (args.length == 1) {
            this.base_url = args[0];
        }
        else if (args.length == 2) {
            this.base_url = args[0];
            this.subdomain = args[1];
        }
    }
}
exports.default = Page;
