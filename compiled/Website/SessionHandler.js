"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Login_1 = __importDefault(require("./Pages/Authentication/Login"));
const Server_1 = __importDefault(require("./Server"));
const Entity_1 = __importDefault(require("../Instances/Entity"));
const Utils_1 = __importDefault(require("../Utils"));
class SessionHandler {
    constructor(data) {
        this.checkForPersonaAccess = (req) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            if (user) {
                const entity = yield new Entity_1.default().load({ _id: user.entity });
                if (!entity
                    || !entity.personas.customer && req.url.startsWith("/c")
                    || !entity.personas.supplier && req.url.startsWith("/s"))
                    return false;
                return true;
            }
            return false;
        });
        this.data = data;
    }
    runMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.url.startsWith('/_next') || req.url.startsWith(Server_1.default.api_base_url)) {
                next();
            }
            else if (req.method.toLowerCase() == 'get' && !this.isSessionRegistered(req) && !this.isAuthURL(req.url)) {
                res.redirect(Login_1.default.base_url);
            }
            else if (this.isSessionRegistered(req) && this.isAuthURL(req.url)) {
                res.redirect('/');
            }
            else if (this.isSessionRegistered(req) && !(yield this.checkForPersonaAccess(req))) {
                res.redirect("/");
            }
            else {
                next();
            }
        });
    }
    isAuthURL(url) {
        return url != null && [Login_1.default.base_url, Server_1.default.api_base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0;
    }
    isSessionRegistered(req) {
        var _a;
        return ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.auth) == true;
    }
    // ======================================================
    removeSessionIfExists(req) {
        if (this.isSessionRegistered(req)) {
            req.session.destroy(() => { });
            // this.data.
        }
    }
    validateSessionWithUser(req, user) {
        if (!(req === null || req === void 0 ? void 0 : req.session) || !user || this.isSessionRegistered(req))
            return;
        user.entity = user.entity._id;
        req.session.auth = true;
        req.session.user = user;
        this.data.redis.set("token:" + user._id.toString(), Utils_1.default.createToken());
    }
}
exports.default = SessionHandler;
