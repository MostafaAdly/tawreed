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
const Department_1 = __importDefault(require("../Instances/Department"));
const User_1 = __importDefault(require("../Instances/User"));
const Entity_1 = __importDefault(require("../Instances/Entity"));
const EntityRole_1 = __importDefault(require("../Instances/EntityRole"));
const Permission_1 = require("../Instances/enums/Permission");
const Product_1 = __importDefault(require("../Instances/Product"));
const SupplierType_1 = __importDefault(require("../Instances/Personas/SupplierType"));
const Price_1 = __importDefault(require("../Instances/Price"));
const ar_1 = require("@faker-js/faker/locale/ar");
const departments_json_1 = __importDefault(require("../DefaultData/departments.json"));
const EntityCategory_1 = __importDefault(require("../Instances/EntityCategory"));
const EntityType_1 = require("../Instances/enums/EntityType");
class MongoDB {
    constructor(data) {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!process.env.MONGODB_CONNECTION_STRING)
                return;
            mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => __awaiter(this, void 0, void 0, function* () {
                this.data.utils.print("Connected to MongoDB.", "MongoDB");
                // await this.eraseDatabase();
                // this.createFakerDummyData(false);
                // await this.deleteAllDepartments()
                // await this.import_departments_intoMySQL();
                // await this.createDummySuppliers();
                // await this.createSemiRealData();
                // await this.createData();
            })).catch((err) => {
                this.data.utils.error("Failed to connect to MongoDB");
                console.error(err);
                process.exit(1);
            });
        });
        this.disconnect = () => mongoose_1.default.disconnect();
        this.import_departments_intoMySQL = () => __awaiter(this, void 0, void 0, function* () {
            const deps = [];
            for (const [key, value] of Object.entries(departments_json_1.default)) {
                const dep = new Department_1.default({ name: key, images: value });
                yield dep.save();
                deps.push(dep);
            }
            ;
            return deps;
        });
        this.createData = () => __awaiter(this, void 0, void 0, function* () {
            const roles = yield mongoose_1.default.models.EntityRole.find();
            const entityCategory = new EntityCategory_1.default({
                name: "المنتجات",
                description: "قسم المنتجات",
                entity: new mongoose_1.default.Types.ObjectId(),
                products: [],
                ancestry: ""
            });
            const entity = new Entity_1.default({
                type: EntityType_1.EntityType.GENERAL,
                details: {
                    displayName: "المتكاملة للسفتي ",
                    logo: "https://www.almotkamelasafety.com/wp-content/uploads/2021/05/logo.png",
                    banner: "https://www.almotkamelasafety.com/wp-content/uploads/2021/05/logo.png",
                    description: `
Company Name: المتكاملة للسفتي (Integrated Safety Solutions)

Company Description:
Integrated Safety Solutions is a pioneering supplier company dedicated to providing comprehensive safety solutions tailored to meet the diverse needs of industries and businesses. With a commitment to excellence and innovation, we specialize in delivering top-of-the-line safety equipment, training, and consultancy services to ensure the highest standards of safety and security across various sectors.

At المتكاملة للسفتي, we understand the paramount importance of safety in every workplace environment. Therefore, our mission is to empower organizations with the tools and knowledge necessary to mitigate risks, prevent accidents, and foster a culture of safety awareness.
                `
                },
                personas: {
                    supplier: new SupplierType_1.default({ products: [] }),
                    customer: { requests: [] }
                },
                roles: roles.map(role => role._id),
                categories: [],
                departments: [new mongoose_1.default.Types.ObjectId("661e4b90496d7f617643f3fa")]
            });
            entityCategory.entity = entity._id;
            yield entityCategory.save();
            entity.categories.push(entityCategory._id);
            yield entity.save();
            const user = new User_1.default({
                displayName: "Safety Islam",
                credentials: { username: "safety_islam", password: "123123" },
                entity: entity._id,
                role: roles[0]._id
            });
            yield user.save();
        });
        this.eraseDatabase = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.models.User.deleteMany({});
            yield mongoose_1.default.models.Department.deleteMany({});
            yield mongoose_1.default.models.Entity.deleteMany({});
            yield mongoose_1.default.models.Product.deleteMany({});
            yield mongoose_1.default.models.EntityCategory.deleteMany({});
            yield mongoose_1.default.models.EntityRole.deleteMany({});
            yield mongoose_1.default.models.Comment.deleteMany({});
            yield mongoose_1.default.models.Request.deleteMany({});
            yield mongoose_1.default.models.Payment.deleteMany({});
        });
        this.deleteAllDepartments = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.models.Department.deleteMany({});
        });
        this.deleteAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.models.User.deleteMany({});
        });
        this.createEntityRoles = () => __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.models.EntityRole.deleteMany();
            const roles = [
                new EntityRole_1.default({ name: "مدير الشركة", permissions: [Permission_1.Permission.CUSTOMER_ALL, Permission_1.Permission.SUPPLIER_ALL], priority: 5 }),
                new EntityRole_1.default({ name: "مدير قسم المشتريات", permissions: [Permission_1.Permission.CUSTOMER_ALL], priority: 50 }),
                new EntityRole_1.default({ name: "مدير قسم المبيعات", permissions: [Permission_1.Permission.SUPPLIER_ALL], priority: 50 })
            ];
            for (const role of roles)
                yield role.save();
        });
        this.createFakerDummyData = (...args_1) => __awaiter(this, [...args_1], void 0, function* (erase = true) {
            const timeTook_start = Date.now();
            if (erase)
                yield this.eraseDatabase();
            const deps = yield this.import_departments_intoMySQL();
            const roles = [
                new EntityRole_1.default({ name: "مدير الشركة", permissions: [Permission_1.Permission.CUSTOMER_ALL, Permission_1.Permission.SUPPLIER_ALL], priority: 5 }),
                new EntityRole_1.default({ name: "مدير قسم المشتريات", permissions: [Permission_1.Permission.CUSTOMER_ALL], priority: 50 }),
                new EntityRole_1.default({ name: "مدير قسم المبيعات", permissions: [Permission_1.Permission.SUPPLIER_ALL], priority: 50 })
            ];
            for (const role of roles)
                yield role.save();
            const products = [];
            for (var i = 0; i < 200; i++) {
                const images = [];
                for (var h = 0; h < 5; h++) {
                    images.push(ar_1.faker.image.url());
                }
                const product = new Product_1.default({
                    name: ar_1.faker.commerce.productName(),
                    description: ar_1.faker.commerce.productDescription(),
                    images,
                    details: { rating: ar_1.faker.number.int({ min: 1, max: 5 }), weight: Math.floor(Math.random() * 100) + " Kg", age: Math.floor(Math.random() * 100), material: ar_1.faker.commerce.productMaterial() },
                    price: new Price_1.default({ cost: parseInt(ar_1.faker.commerce.price()), quantity: Math.floor(Math.random() * 5), unit: "دستة", currency: "جنيه مصري" })
                });
                yield product.save();
                products.push(product);
            }
            const entities = [];
            for (var i = 0; i < 5; i++) {
                const entityProducts = [];
                for (var h = 0; h < Math.floor(Math.random() * (products.length / 2)); h++) {
                    entityProducts.push(this.random(products)._id);
                }
                const entity = new Entity_1.default({
                    type: EntityType_1.EntityType.GENERAL,
                    details: {
                        displayName: ar_1.faker.company.name(),
                        logo: ar_1.faker.image.avatar(),
                        banner: ar_1.faker.image.url(),
                        description: ar_1.faker.company.catchPhrase(),
                    },
                    personas: {
                        supplier: new SupplierType_1.default({ products: entityProducts }),
                        customer: { requests: [] }
                    },
                    departments: [this.random(deps)._id],
                    roles: roles.map(role => role._id),
                    categories: []
                });
                const cats = [];
                for (var h = 0; h < Math.floor(Math.random() * 2) + 1; h++) {
                    const cat = new EntityCategory_1.default({
                        name: `Group ${ar_1.faker.word.sample()}`,
                        description: ar_1.faker.company.catchPhrase(),
                        entity: entity._id
                    });
                    yield cat.createFakerChildren(products, entity, 3);
                    cats.push(cat);
                }
                entity.categories = cats.map(cat => cat._id);
                entities.push(entity);
                yield entity.save();
            }
            yield this.createDefaultDeveloperUser(entities, roles);
            const users = [];
            for (var i = 0; i < 20; i++) {
                const user = new User_1.default({
                    displayName: ar_1.faker.internet.displayName(),
                    credentials: { username: ar_1.faker.internet.userName(), password: ar_1.faker.internet.password() },
                    entity: this.random(entities)._id, role: this.random(roles)._id
                });
                yield user.save();
                users.push(user);
            }
            this.data.utils.print(`Took ${(Date.now() - timeTook_start) / 1000}sec to delete and create:`, "FAKER");
            this.data.utils.print(`Created ${roles.length} roles.`, "FAKER");
            this.data.utils.print(`Created ${products.length} products.`, "FAKER");
            this.data.utils.print(`Created ${entities.length} entities.`, "FAKER");
            this.data.utils.print(`Created ${(yield mongoose_1.default.models.EntityCategory.find({})).length} categories.`, "FAKER");
            this.data.utils.print(`Created ${users.length} users.`, "FAKER");
        });
        this.random = (list) => list[Math.floor(Math.random() * list.length)];
        this.createDefaultDeveloperUser = (entities, roles) => __awaiter(this, void 0, void 0, function* () {
            return yield new User_1.default({
                displayName: "Mostafa Adly", credentials: { username: "mostafaadly", password: "123123" }, entity: entities[0]._id, role: roles[0]._id
            }).save();
        });
        this.data = data;
    }
}
exports.default = MongoDB;
