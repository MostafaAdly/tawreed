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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DepartmentSchema_1 = __importDefault(require("./Schema/DepartmentSchema"));
const EntitySchema_1 = __importDefault(require("./Schema/EntitySchema"));
const UserSchema_1 = __importDefault(require("./Schema/UserSchema"));
const ProductSchema_1 = __importDefault(require("./Schema/ProductSchema"));
const EntityRoleSchema_1 = __importDefault(require("./Schema/EntityRoleSchema"));
const EntityCategorySchema_1 = __importDefault(require("./Schema/EntityCategorySchema"));
const Department_1 = __importDefault(require("../Instances/Department"));
const CommentSchema_1 = __importDefault(require("./Schema/CommentSchema"));
const RequestSchema_1 = __importDefault(require("./Schema/RequestSchema"));
class ModelManager {
    constructor() {
        this.idSchema = {
            enabled: false,
            key: "id",
            value: {
                type: mongoose_1.default.Types.ObjectId,
                required: true,
                default: new mongoose_1.default.Types.ObjectId(),
                // unique: true,
                // alias: "_id",
                get: (v) => v.toString(),
                set: (v) => v ? new mongoose_1.default.Types.ObjectId(v) : new mongoose_1.default.Types.ObjectId()
            }
        };
        this.options = {
            versionKey: false, timestamps: true, _id: true
        };
        this.populateModels = () => __awaiter(this, void 0, void 0, function* () {
            const input = { id: this.idSchema, options: this.options };
            const schemas = [
                new DepartmentSchema_1.default(input),
                new EntitySchema_1.default(input),
                new UserSchema_1.default(input),
                new ProductSchema_1.default(input),
                new EntityCategorySchema_1.default(input),
                new EntityRoleSchema_1.default(input),
                new CommentSchema_1.default(input),
                new RequestSchema_1.default(input)
            ];
            schemas.forEach(schema => {
                this.schemaManipulate(schema);
                mongoose_1.default.model(schema.model, schema);
            });
            yield this.testDatabase();
        });
        this.schemaManipulate = (schema) => {
            // schema.method('toClient', function () {
            //     var obj = this.toObject() as any;
            //     obj.id = obj._id.toString();
            //     delete obj._id;
            //     return obj;
            // });
            //     schema.plugin((schema, options) => {
            //         schema.virtual('loadedAt').
            //             get(function () { console.log(this._loadedAt); return this._loadedAt; }).
            //             set(function (v) { this._loadedAt = v; });
            //         // schema.post(['find', 'findOne'], function (docs) {
            //         //     if (!Array.isArray(docs)) docs = [docs];
            //         //     const now = new Date();
            //         //     for (var doc of docs) {
            //         //         doc.id = doc._id;
            //         //         delete doc._id
            //         //     }
            //         //     console.log(docs[0])
            //         // });
            //     });
        };
        this.testDatabase = () => __awaiter(this, void 0, void 0, function* () {
            // const Department = mongoose.models.Department;
            // const Entity = mongoose.models.Entity;
            // const User = mongoose.models.User;
            // const Product = mongoose.models.Product;
            // const EntityCategory = mongoose.models.EntityCategory;
            // const EntityRole = mongoose.models.EntityRole;
            const dep = yield new Department_1.default().load({});
            // console.log(dep)
            // await Department.updateOne({ _id: dep._id }, { name: "New Name" }).exec();
            // console.log((await Department.findOne({})));
        });
    }
}
_a = ModelManager;
ModelManager.loadOne = (className, query) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const doc = (_b = (yield mongoose_1.default.models[className].findOne(query).exec())) === null || _b === void 0 ? void 0 : _b.toObject();
    if (!doc)
        return doc;
    // doc.id = doc._id.toString();
    // delete doc._id;
    return doc;
});
ModelManager.save = (className, object) => __awaiter(void 0, void 0, void 0, function* () {
    yield new mongoose_1.default.models[className](object).save();
});
exports.default = ModelManager;
