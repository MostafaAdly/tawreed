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
const User_1 = __importDefault(require("../../../Instances/User"));
const Page_1 = __importDefault(require("../Page"));
class SupplierProfileAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + SupplierProfileAPI.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.post('/add-user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, token, entityId } = req.body;
            if (!token || !userId || !entityId)
                return res.status(400).send({ message: "Invalid request" });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            if (yield new User_1.default()._load({ $or: [{ "credentials.username": req.body.username }, { "details.email": req.body.email }] }))
                return res.status(400).send({ message: "User already exists", error: 1 });
            const user = new User_1.default({
                displayName: req.body.displayName,
                details: {
                    nickname: req.body.nickname,
                    phone: req.body.phone,
                    email: req.body.email
                },
                credentials: {
                    username: req.body.username,
                    password: req.body.password
                },
                entity: new mongoose_1.default.Types.ObjectId(entityId),
                role: new mongoose_1.default.Types.ObjectId(req.body.role)
            });
            yield user.save();
            return res.send({ message: "User successfully created", success: 1 });
        }));
    }
}
SupplierProfileAPI.base_url = "/profile";
exports.default = SupplierProfileAPI;
