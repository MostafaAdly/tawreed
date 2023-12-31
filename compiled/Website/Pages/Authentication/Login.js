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
const User_1 = __importDefault(require("../../../Instances/User"));
const Page_1 = __importDefault(require("../Page"));
class Login extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Login.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            res.render('Authentication/login', { project_name: this.data.project_name });
        });
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const credentials = req.body;
            const validatedUser = yield this.validateCredentialsToUser(credentials);
            var reason = "Email address or password is incorrect.";
            if (validatedUser)
                this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);
            res.redirect(validatedUser ? `/home` : `/login?error=${reason}`);
        }));
    }
    static validateCredentials(credentials) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.schema().findOne({ 'credentials.email': credentials.email.toLowerCase() });
            return ((_a = user === null || user === void 0 ? void 0 : user.credentials) === null || _a === void 0 ? void 0 : _a.password) == credentials.password;
        });
    }
    validateCredentialsToUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.schema().findOne({ 'credentials.email': credentials.email.toLowerCase(), 'credentials.password': credentials.password });
        });
    }
}
Login.base_url = "/login";
exports.default = Login;
