"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ================================================================= [ Libraries ]
const Page_1 = __importDefault(require("../Page"));
// ================================================================= [ Authentication - Login ]
class WildCard extends Page_1.default {
    constructor(data) {
        super(WildCard.base_url);
        this.data = data;
        this.run();
    }
    run() {
        const handler = this.data.server.next.getRequestHandler();
        this.router.get('*', (req, res) => handler(req, res));
    }
}
WildCard.base_url = "";
exports.default = WildCard;
