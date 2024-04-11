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
const mongoose_1 = __importDefault(require("mongoose"));
const Permission_1 = require("../../../Instances/Permission");
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
            this.data.server.next.render(req, res, '/Authentication/LoginPage', { data: JSON.stringify({ error: req.query.error }) });
        });
        this.router.post("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const credentials = req.body;
            const validatedUser = yield this.validateCredentialsToUser(credentials);
            if (!validatedUser)
                return res.status(200).redirect(`/login?error=${(validatedUser === null || validatedUser === void 0 ? void 0 : validatedUser.entity) ? 2 : 1}`);
            console.log("-------------");
            const isCustomerValid = this.hasPermissions(validatedUser, 1);
            const isSupplierValid = this.hasPermissions(validatedUser, 2);
            this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);
            console.log("isCustomerValid", isCustomerValid);
            console.log("isSupplierValid", isSupplierValid);
            console.log("-------------");
            if (isCustomerValid && isSupplierValid)
                return res.status(200).redirect("/");
            return res.status(200).redirect(isCustomerValid ? (Home_1.default.base_url + `/#departments`) : MyCompany_1.default.base_url);
        }));
    }
    hasPermissions(user, persona) {
        const permissions = persona == 0 ? Object.values(Permission_1.Permission) : [];
        if (persona == 1)
            permissions.push(Permission_1.Permission.CUSTOMER_ALL);
        else if (persona == 2)
            permissions.push(Permission_1.Permission.SUPPLIER_ALL);
        const found = user.entity.roles.includes(user.role._id);
        return user.role != null && user.role.permissions != null && permissions.every((permission) => user.role.permissions.includes(permission));
    }
    static validateCredentials(credentials) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield new User_1.default()._load({ 'credentials.username': credentials.username.toLowerCase() }));
            return ((_a = user === null || user === void 0 ? void 0 : user.credentials) === null || _a === void 0 ? void 0 : _a.password) == credentials.password;
        });
    }
    validateCredentialsToUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongoose_1.default.models.User.findOne({ 'credentials.username': credentials.username.toLowerCase(), 'credentials.password': credentials.password })
                .populate({ path: 'entity' }).populate('role');
        });
    }
}
Login.base_url = "/login";
exports.default = Login;
