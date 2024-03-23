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
const Entity_1 = __importDefault(require("../../../Instances/Entity"));
const Permission_1 = require("../../../Instances/Personas/Permission");
const User_1 = __importDefault(require("../../../Instances/User"));
const Page_1 = __importDefault(require("../Page"));
const Home_1 = __importDefault(require("../Personas/Customer/Home/Home"));
const MyCompany_1 = __importDefault(require("../Personas/Supplier/MyCompany"));
class Login extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Login.base_url);
        this.reasons = {
            "1": "Username or password is incorrect."
        };
        this.data = data;
        this.run();
    }
    run() {
        this.router.get("/", (req, res) => {
            this.data.server.next.render(req, res, '/Authentication/LoginPage', {}
            // { project_name: this.data.project_name, error: this.reasons[req.query.error] == null ? "" : this.reasons[req.query.error] }
            );
        });
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const credentials = req.body;
            const validatedUser = yield this.validateCredentialsToUser(credentials);
            const entity = yield Entity_1.default.schema().findOne({ id: validatedUser === null || validatedUser === void 0 ? void 0 : validatedUser.entity });
            if (validatedUser)
                this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);
            else {
                console.log("ERROR");
                return res.status(200).redirect(`/login?error=${entity ? 2 : 1}`);
            }
            return res.redirect(MyCompany_1.default.base_url);
            if (this.hasCustomerAndSupplierPermissions(validatedUser, entity))
                return res.status(200).redirect("/");
            return res.status(200).redirect(this.hasCustomerPermissions(validatedUser, entity) ? (Home_1.default.base_url + `/#departments`) : MyCompany_1.default.base_url);
        }));
    }
    hasCustomerAndSupplierPermissions(user, entity) {
        return this.hasCustomerPermissions(user, entity) && this.hasSupplierPermissions(user, entity);
    }
    hasCustomerPermissions(user, entity) {
        var _a;
        const list = (_a = entity.roles.find(role => role.id == user.role)) === null || _a === void 0 ? void 0 : _a.permissions;
        return user.role != null && list != null && list.includes(Permission_1.Permission.CUSTOMER_ALL);
    }
    hasSupplierPermissions(user, entity) {
        var _a;
        const list = (_a = entity.roles.find(role => role.id == user.role)) === null || _a === void 0 ? void 0 : _a.permissions;
        return user.role != null && list != null && list.includes(Permission_1.Permission.SUPPLIER_ALL);
    }
    static validateCredentials(credentials) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            return ((_b = (_a = (yield User_1.default.schema().findOne({ 'credentials.username': credentials.username.toLowerCase() }))) === null || _a === void 0 ? void 0 : _a.credentials) === null || _b === void 0 ? void 0 : _b.password) == credentials.password;
        });
    }
    validateCredentialsToUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.default.schema().findOne({ 'credentials.username': credentials.username.toLowerCase(), 'credentials.password': credentials.password });
        });
    }
}
Login.base_url = "/login";
exports.default = Login;
