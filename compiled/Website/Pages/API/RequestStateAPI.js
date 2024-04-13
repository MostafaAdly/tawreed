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
const Request_1 = __importDefault(require("../../../Instances/Request"));
const ResponseType_1 = require("../../../Instances/ResponseType");
const Page_1 = __importDefault(require("../Page"));
class RequestStateAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + RequestStateAPI.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { requestId, userId, token, state } = req.body;
            if (!requestId || !token || !userId || !state)
                return res.status(400).send({ message: "Invalid request" });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            if (!Object.keys(ResponseType_1.ResponseType).includes(state))
                return res.status(400).send({ message: "Invalid state" });
            if (!(yield new Request_1.default().load({ _id: requestId })))
                return res.status(404).send({ message: "Request not found" });
            mongoose_1.default.models.Request.updateOne({ _id: requestId }, { responseType: ResponseType_1.ResponseType[state] }).exec();
            return res.send({ message: "Request state updated successfully", success: 1 });
        }));
        this.router.delete('/delete', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { requestId, userId, token } = req.body;
            if (!requestId || !token || !userId)
                return res.status(400).send({ message: "Invalid request" });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            if (!(yield new Request_1.default().load({ _id: requestId })))
                return res.status(404).send({ message: "Request not found" });
            mongoose_1.default.models.Request.deleteOne({ _id: requestId }).exec();
            return res.send({ message: "Request deleted successfully", success: 1 });
        }));
    }
}
RequestStateAPI.base_url = "/request";
exports.default = RequestStateAPI;
