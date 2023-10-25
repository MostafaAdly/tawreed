"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Page {
    constructor(base_url) {
        this.router = (0, express_1.Router)();
        this.base_url = base_url;
    }
}
exports.default = Page;
