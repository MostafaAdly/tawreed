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
const Page_1 = __importDefault(require("../Page"));
class Profile extends Page_1.default {
    constructor(data, base_url) {
        super(base_url || Profile.base_url);
        this.data = data;
        this.run();
    }
    run() {
        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.session.user;
            const entity = yield mongoose_1.default.models.Entity.findOne({ _id: user.entity }).populate('roles');
            const usersCount = (yield mongoose_1.default.models.User.find({ entity: entity._id }).exec()).length;
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/User/ProfilePage', {
                data: JSON.stringify({
                    user, entity, usersCount
                })
            });
        }));
    }
}
Profile.base_url = "/profile";
exports.default = Profile;
