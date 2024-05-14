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
const Entity_1 = __importDefault(require("../../../Instances/Entity"));
const EntityCategory_1 = __importDefault(require("../../../Instances/EntityCategory"));
const CustomerType_1 = __importDefault(require("../../../Instances/Personas/CustomerType"));
const SupplierType_1 = __importDefault(require("../../../Instances/Personas/SupplierType"));
const User_1 = __importDefault(require("../../../Instances/User"));
const Page_1 = __importDefault(require("../Page"));
const mongoose_1 = __importDefault(require("mongoose"));
class EntityData extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + EntityData.base_url);
        this.createDefaultCategory = (entity) => __awaiter(this, void 0, void 0, function* () {
            const category = new EntityCategory_1.default({
                name: "Default",
                description: "Default category",
                parent: "",
                entity: entity._id
            });
            yield category.save();
            return category;
        });
        this.data = data;
        this.run();
    }
    run() {
        this.router.post('/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { token, userId, entity: entityData, user: userData } = req.body;
            if (!token || !entityData || !userData)
                return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            const department = yield mongoose_1.default.models.Department.findOne({ _id: entityData.department }).exec();
            if (!department)
                return res.status(400).send({ message: "Invalid department", error: 1 });
            const loadedUser = yield mongoose_1.default.models.User.findOne({ 'credentials.username': userData.username }).exec();
            if (loadedUser)
                return res.status(400).send({ message: "User already exists", error: 1 });
            const entity = new Entity_1.default({
                type: entityData.type,
                details: {
                    description: entityData.description,
                    displayName: entityData.displayName,
                    logo: "https://w7.pngwing.com/pngs/29/173/png-transparent-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-trademark.png",
                    banner: "https://w7.pngwing.com/pngs/29/173/png-transparent-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-trademark.png"
                },
                personas: {
                    supplier: new SupplierType_1.default({ products: [] }),
                    customer: new CustomerType_1.default({ requests: [] }),
                },
                roles: yield mongoose_1.default.models.EntityRole.find({}).exec(),
                departments: [department._id],
            });
            entity.categories.push(yield this.createDefaultCategory(entity));
            const user = new User_1.default({
                displayName: userData.displayName,
                credentials: {
                    username: userData.username,
                    password: userData.password
                },
                entity: entity._id,
                role: new mongoose_1.default.Types.ObjectId(userData.role),
                admin: false
            });
            yield entity.save();
            yield user.save();
            return res.send({ message: "Entity created successfully", success: 1 });
        }));
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
