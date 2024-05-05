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
const Entity_1 = __importDefault(require("../../../../Instances/Entity"));
const ResponseType_1 = require("../../../../Instances/enums/ResponseType");
const Page_1 = __importDefault(require("../../Page"));
const mongoose_1 = __importDefault(require("mongoose"));
class MyRequests extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || MyRequests.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // SUPPLIER - MY REQUESTS PAGE
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const requests = yield mongoose_1.default.models.Request.find({ supplier: entity._id }).populate('product').exec();
            this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierRequestsPage', { data: JSON.stringify({ user, entity, requests }) });
        }));
        // SUPPLIER - MY RFQ 
        this.router.get('/rfq/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const request = yield mongoose_1.default.models.Request
                .findOne({ requestId: req.params.id })
                .populate('product')
                .populate('customer')
                .exec();
            if (!request) {
                // TODO: HANDLE REQUEST IF NULL
                return;
            }
            if (request.responseType != ResponseType_1.ResponseType.RFQ_PENDING)
                res.status(300).redirect(MyRequests.base_url);
            this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierApproveRFQPage', { data: JSON.stringify({ user, entity, request }) });
        }));
        // // SUPPLIER - MY ORDER 
        // this.router.get('/order/:id', async (req: any, res: any) => {
        //     const user = req.session.user;
        //     const entity = await new Entity().load({ _id: user.entity });
        //     if (!entity) {
        //         // TODO: HANDLE ENTITY IF NULL
        //         return;
        //     }
        //     this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierApproveOrderPage', { data: JSON.stringify({ user, entity }) });
        // });
    }
}
MyRequests.base_url = "/s/requests";
exports.default = MyRequests;
