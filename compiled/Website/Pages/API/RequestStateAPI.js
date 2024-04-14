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
const Payment_1 = __importDefault(require("../../../Instances/Payment"));
const RequestType_1 = require("../../../Instances/RequestType");
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
            const request = yield mongoose_1.default.models.Request.findOne({ _id: requestId }).populate({
                path: 'product', select: "entity"
            });
            if (!request)
                return res.status(404).send({ message: "Request not found" });
            const toUpdate = { responseType: ResponseType_1.ResponseType[state] };
            if (ResponseType_1.ResponseType.PURCHASE_DELIVERED && !request.payment) {
                var payment = new Payment_1.default({
                    request: requestId,
                    customer: request.customer,
                    supplier: request.supplier,
                });
                payment.save();
                toUpdate.payment = payment._id;
            }
            mongoose_1.default.models.Request.updateOne({ _id: requestId }, toUpdate).exec();
            return res.send({ message: "Request state updated successfully", success: 1 });
        }));
        this.router.delete('/delete', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { requestId, userId, token } = req.body;
            if (!requestId || !token || !userId)
                return res.status(400).send({ message: "Invalid request" });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            const request = yield new Request_1.default().load({ _id: requestId });
            if (!request)
                return res.status(404).send({ message: "Request not found" });
            if (request.responseType == ResponseType_1.ResponseType.PURCHASE_DELIVERED)
                return res.status(400).send({ message: "Delivered orders cannot be deleted.", error: 1 });
            mongoose_1.default.models.Request.deleteOne({ _id: requestId }).exec();
            return res.send({ message: "Request deleted successfully", success: 1 });
        }));
        this.router.post('/count', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, customerId, token } = req.body;
            if (!token || !userId || !customerId)
                return res.status(400).send({ message: "Invalid request" });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            const requests = yield mongoose_1.default.models.Request
                .find({ customer: customerId })
                .select("requestType").exec();
            return res.send({
                total: requests.length,
                purchase: requests.filter(request => request.requestType == RequestType_1.RequestType.PURCHASE).length,
                rfq: requests.filter(request => request.requestType == RequestType_1.RequestType.RFQ).length
            });
        }));
    }
}
RequestStateAPI.base_url = "/request";
exports.default = RequestStateAPI;
