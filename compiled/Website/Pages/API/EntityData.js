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
const Page_1 = __importDefault(require("../Page"));
const mongoose_1 = __importDefault(require("mongoose"));
class EntityData extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + EntityData.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.post('/description', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId, entityId, description } = req.body;
            if (!token || !userId || !entityId || description.replaceAll(" ", "") == "")
                return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            yield mongoose_1.default.models.Entity.updateOne({ _id: entityId }, { "details.description": description }).exec();
            return res.send({ message: "Entity - Description updated successfully", success: 1 });
        }));
    }
}
EntityData.base_url = "/entity";
exports.default = EntityData;
