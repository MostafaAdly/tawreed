"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
const Server_1 = __importDefault(require("./Server"));
const PersonaSelector_1 = __importDefault(require("./Pages/Personas/Selector/PersonaSelector"));
class SessionHandler {
    constructor(data) {
        this.data = data;
    }
    runMiddleware(req, res, next) {
        // console.log(req.method, req.url, this.isSessionRegistered(req), this.isAuthURL(req.url))
        if (req.url.startsWith('/_next')) {
            next();
        }
        else if (req.method.toLowerCase() == 'get' && !this.isSessionRegistered(req) && !this.isAuthURL(req.url)) {
            res.redirect(Login_1.default.base_url);
            // console.log("------")
        }
        else if (this.isSessionRegistered(req) && this.isAuthURL(req.url)) {
            res.redirect(PersonaSelector_1.default.base_url);
            // console.log("----=========-")
        }
        else
            next();
    }
    isAuthURL(url) {
        return url != null && [Login_1.default.base_url, Server_1.default.api_base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0;
    }
    isSessionRegistered(req) {
        var _a;
        return ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.auth) == true;
    }
    // =========
    removeSessionIfExists(req) {
        if (this.isSessionRegistered(req))
            req.session.destroy(() => { });
    }
    validateSessionWithUser(req, user) {
        if (!(req === null || req === void 0 ? void 0 : req.session) || !user || this.isSessionRegistered(req))
            return;
        req.session.auth = true;
        req.session.user = user;
    }
}
exports.default = SessionHandler;
