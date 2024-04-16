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
const Page_1 = __importDefault(require("../../Page"));
const Entity_1 = __importDefault(require("../../../../Instances/Entity"));
class MyCompany extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || MyCompany.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // SUPPLIER - MY COMPANY PAGE
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield new Entity_1.default().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            entity.users = (yield mongoose_1.default.models.User
                .find({ entity: entity._id })
                .populate('role').exec());
            this.data.server.next
                .render(req, res, '/Supplier/MyCompany/SupplierCompanyPage', { data: JSON.stringify({ user, entity }) });
        }));
        // SUPPLIER - MY COMPANY PAGE - ADD USER - GET REQUEST
        this.router.get('/profile/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield mongoose_1.default.models.Entity.findOne({ _id: user.entity }).populate('roles');
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            this.data.server.next
                .render(req, res, '/Supplier/MyCompany/SupplierAddUserPage', { data: JSON.stringify({ user, entity }) });
        }));
        // SUPPLIER - MY COMPANY PAGE - EDIT USER - GET REQUEST
        this.router.get('/profile/user/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield mongoose_1.default.models.Entity.findOne({ _id: user.entity }).populate('roles');
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const editedUser = yield mongoose_1.default.models.User.findOne({ userId: req.params.id }).populate('role');
            if (!editedUser) {
                // TODO: HANDLE EDITED USER IF NULL
                return;
            }
            if (entity._id.toString() != editedUser.entity.toString()) {
                // TODO: HANDLE EDITED USER IF NOT IN THE SAME ENTITY
                return;
            }
            this.data.server.next
                .render(req, res, '/Supplier/MyCompany/SupplierAddUserPage', { data: JSON.stringify({ user, entity, editedUser }) });
        }));
    }
}
MyCompany.base_url = "/s";
exports.default = MyCompany;
