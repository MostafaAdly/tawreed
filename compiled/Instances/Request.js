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
const Utils_1 = __importDefault(require("../Utils"));
const ModelManager_1 = __importDefault(require("../Database/ModelManager"));
const RequestType_1 = require("./RequestType");
const ResponseType_1 = require("./ResponseType");
class Request {
    constructor(input) {
        this._id = new mongoose_1.default.Types.ObjectId();
        this.requestId = Utils_1.default.requestId_prefix + Utils_1.default.createId();
        this.responseType = ResponseType_1.ResponseType.PURCHASE_PENDING;
        this.requestType = RequestType_1.RequestType.PURCHASE;
        this.processPurchase = (requestType, productId, supplierId, userId) => __awaiter(this, void 0, void 0, function* () {
            this.product = productId;
            this.entity = supplierId;
            this.user = userId;
            this.requestType = requestType;
            yield this.save();
            return this;
        });
        this.setRfqSettings = (rfqSettings) => {
            this.rfqSettings = rfqSettings;
            if (JSON.stringify(rfqSettings) != "{}")
                this.responseType = ResponseType_1.ResponseType.RFQ_PENDING;
            return this;
        };
        this.load = (query) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield ModelManager_1.default.loadOne(this.constructor.name, query);
            if (!doc)
                return;
            Object.assign(this, doc);
            return this;
        });
        this.save = () => __awaiter(this, void 0, void 0, function* () { return yield ModelManager_1.default.save(this.constructor.name, this); });
        if (input)
            Object.assign(this, input);
    }
}
exports.default = Request;
