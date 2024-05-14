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
class Entities extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Entities.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // ADMIN @ GET /entities
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            if (!user.admin)
                return res.status(301).redirect("/");
            const entities = yield mongoose_1.default.models.Entity.find({}).exec();
            const roles = yield mongoose_1.default.models.EntityRole.find({ priority: { $lte: 10 } }).select('name id').exec();
            const users = yield mongoose_1.default.models.User.find({}).populate({ path: 'role', select: 'name priority' }).select('name id entity displayName role').exec();
            const departments = yield mongoose_1.default.models.Department.find({}).select('name id').exec();
            this.data.server.next.render(req, res, '/Admin/Entities/AdminEntitiesPage', {
                data: JSON.stringify({
                    user,
                    users,
                    entities,
                    roles,
                    departments
                })
            });
        }));
    }
}
Entities.base_url = "/entities";
exports.default = Entities;
