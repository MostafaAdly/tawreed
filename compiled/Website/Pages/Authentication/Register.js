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
const Login_1 = __importDefault(require("./Login"));
class Register extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Register.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            res.render('Authentication/register', { project_name: this.data.project_name });
        });
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            var { name, email, password } = req.body;
            var failed = !name || !email || !password;
            var reason = "Email address or password is not valid.";
            if (!failed) {
                email = email.toLowerCase();
                if (!(yield Login_1.default.validateCredentials({ email, password }))) {
                    const promisedCreatedUser = yield this.createUser(name, email, password);
                    if (promisedCreatedUser) {
                        failed = false;
                        this.data.utils.print(`Created new user with name of ${name["yellow"]} and email of ${email["green"]}`);
                        this.data.server.sessionHandler.validateSessionWithUser(req, promisedCreatedUser);
                    }
                }
            }
            res.redirect(failed ? `/register?error=${reason}` : `/home`);
        }));
    }
    createUser(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new User_1.default({
                name, credentials: { email: email.toLowerCase(), password }
            }).save();
        });
    }
}
Register.base_url = "/register";
exports.default = Register;
