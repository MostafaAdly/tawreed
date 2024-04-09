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
const departments_json_1 = __importDefault(require("../DefaultData/departments.json"));
const Department_1 = __importDefault(require("../Instances/Department"));
const User_1 = __importDefault(require("../Instances/User"));
const Entity_1 = __importDefault(require("../Instances/Entity"));
const EntityRole_1 = __importDefault(require("../Instances/Personas/EntityRole"));
const Permission_1 = require("../Instances/Personas/Permission");
const Product_1 = __importDefault(require("../Instances/Product"));
const SupplierType_1 = __importDefault(require("../Instances/Personas/SupplierType"));
const uuid_1 = require("uuid");
const Price_1 = __importDefault(require("../Instances/Price"));
const ar_1 = require("@faker-js/faker/locale/ar");
const EntityCategory_1 = __importDefault(require("../Instances/EntityCategory"));
class MongoDB {
    constructor(data) {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!process.env.MONGODB_CONNECTION_STRING)
                return;
            mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING).then(() => __awaiter(this, void 0, void 0, function* () {
                this.data.utils.print("Connected to MongoDB.");
                // this.createFakerDummyData();
                // await this.deleteAllDepartments()
                // await this.import_departments_intoMySQL();
                // await this.createDummySuppliers();
                // await this.createSemiRealData();
            })).catch(() => {
                this.data.utils.error("Failed to connect to MongoDB");
                process.exit(1);
            });
        });
        this.disconnect = () => mongoose_1.default.disconnect();
        this.import_departments_intoMySQL = () => __awaiter(this, void 0, void 0, function* () {
            const deps = [];
            for (const [key, value] of Object.entries(departments_json_1.default)) {
                const dep = new Department_1.default(key, value);
                yield dep.save();
                deps.push(dep);
            }
            ;
            return deps;
        });
        this.deleteAllDepartments = () => __awaiter(this, void 0, void 0, function* () {
            yield Department_1.default.schema().deleteMany({});
        });
        this.deleteAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            yield User_1.default.schema().deleteMany({});
        });
        this.createFakerDummyData = () => __awaiter(this, void 0, void 0, function* () {
            const timeTook_start = Date.now();
            yield this.deleteAllDepartments();
            yield Entity_1.default.schema().deleteMany({});
            yield Product_1.default.schema().deleteMany({});
            yield User_1.default.schema().deleteMany({});
            yield EntityCategory_1.default.schema().deleteMany({});
            const deps = yield this.import_departments_intoMySQL();
            const roles = [
                new EntityRole_1.default({ name: "مدير الشركة", permissions: [Permission_1.Permission.CUSTOMER_ALL, Permission_1.Permission.SUPPLIER_ALL] }),
                new EntityRole_1.default({ name: "مدير قسم المشتريات", permissions: [Permission_1.Permission.CUSTOMER_ALL] }),
                new EntityRole_1.default({ name: "مدير قسم المبيعات", permissions: [Permission_1.Permission.SUPPLIER_ALL] })
            ];
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
                for (var h = 0; h < Math.floor(Math.random() * 100); h++) {
                    entityProducts.push(this.random(products).id);
                }
                const entity = new Entity_1.default({
                    details: {
                        displayName: ar_1.faker.company.name(),
                        logo: ar_1.faker.image.avatar(),
                        banner: ar_1.faker.image.url(),
                        description: ar_1.faker.company.catchPhrase(),
                        categories: [this.random(deps).id]
                    },
                    personas: {
                        supplier: new SupplierType_1.default({ products: entityProducts })
                    },
                    roles,
                    categories: []
                });
                const cats = [];
                for (var h = 0; h < Math.floor(Math.random() * 2) + 1; h++) {
                    const cat = new EntityCategory_1.default({
                        name: `Group ${ar_1.faker.word.sample()}`,
                        description: ar_1.faker.company.catchPhrase(),
                        entity: entity.id
                    });
                    yield cat.createFakerChildren(products, entity, 3);
                    cats.push(cat);
                }
                entity.categories = cats.map(cat => cat.id);
                entities.push(entity);
                yield entity.save();
            }
            yield this.createDefaultDeveloperUser(entities, roles);
            const users = [];
            for (var i = 0; i < 20; i++) {
                const user = new User_1.default(ar_1.faker.internet.displayName(), { username: ar_1.faker.internet.userName(), password: ar_1.faker.internet.password() }, this.random(entities).id, this.random(roles).id);
                yield user.save();
                users.push(user);
            }
            this.data.utils.print(`Took ${(Date.now() - timeTook_start) / 1000}sec to delete and create:`, "FAKER");
            this.data.utils.print(`Created ${roles.length} roles.`, "FAKER");
            this.data.utils.print(`Created ${products.length} products.`, "FAKER");
            this.data.utils.print(`Created ${entities.length} entities.`, "FAKER");
            this.data.utils.print(`Created ${(yield EntityCategory_1.default.schema().find({})).length} categories.`, "FAKER");
            this.data.utils.print(`Created ${users.length} users.`, "FAKER");
        });
        this.random = (list) => list[Math.floor(Math.random() * list.length)];
        this.createSemiRealData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                // await this.deleteAllDepartments();
                // await this.import_departments_intoMySQL();
                yield Entity_1.default.schema().deleteMany({});
                yield Product_1.default.schema().deleteMany({});
                const roles = [
                    new EntityRole_1.default({ name: "مدير الشركة", permissions: [Permission_1.Permission.CUSTOMER_ALL, Permission_1.Permission.SUPPLIER_ALL] }),
                    new EntityRole_1.default({ name: "مدير قسم المشتريات", permissions: [Permission_1.Permission.CUSTOMER_ALL] }),
                    new EntityRole_1.default({ name: "مدير قسم المبيعات", permissions: [Permission_1.Permission.SUPPLIER_ALL] })
                ];
                const products = [
                    new Product_1.default({
                        name: "خوذة ذهبية فائقة النصاع",
                        description: `
خوذة ذهبية فائقة النصاع: تاجٌ من الحمايةِ والجمالِ
هل تبحث عن قطعةٍ فريدةٍ تُكملُ مظهركَ وتُضفي عليهِ لمسةً من الفخامةِ والتميز؟

لا تبحث أكثر! خوذة ذهبية فائقة النصاع هي الحلّ المثاليّ لك!

مميزاتُ خوذة ذهبية فائقة النصاع:

مصنوعةٌ من الذهبِ الخالصِ عيار 24 قيراطًا، تضمنُ لكَ فخامةً لا مثيلَ لها.
تصميمٌ فريدٌ من نوعهِ مُستوحى من تيجانِ الملوكِ القدماءِ، يُضفي على مظهركَ هالةً من الجلالِ والرهبةِ.
مُطعمةٌ بأحجارٍ كريمةٍ لامعةٍ تُضفي عليها بريقًا ساحرًا يُلفتُ الأنظارَ أينما ذهبتَ.
خفيفةُ الوزنِ ومريحةٌ في الارتداءِ، تضمنُ لكَ شعورًا بالراحةِ والأمانِ طوالَ اليومِ.
تأتي في مُختلفِ الأحجامِ لتناسبُ جميعَ الأذواقِ.
خوذة ذهبية فائقة النصاع ليستْ مجردَ قطعةٍ من المجوهراتِ، بل هي رمزٌ للثروةِ والسلطةِ والجاهِ.

ارتديها وكنْ نجمَ المناسبةِ!

الآنَ في متجرنا بسعرٍ استثنائيّ!

لا تفوّتْ هذهِ الفرصةَ الذهبيةَ!

ملاحظات:

يمكنُ استخدامُ خوذة ذهبية فائقة النصاع في المناسباتِ الرسميةِ والاجتماعيةِ، أو كقطعةٍ فنيةٍ تُزينُ منزلكَ.
تُعدّ خوذة ذهبية فائقة النصاع هديةً رائعةً للأصدقاءِ والعائلةِ في المناسباتِ الخاصةِ.
احرص على تنظيفِ خوذة ذهبية فائقة النصاع بقطعةٍ قماشٍ ناعمةٍ بعدَ كلّ استعمالٍ.
احفظْ خوذة ذهبية فائقة النصاع في مكانٍ آمنٍ بعيدًا عن الغبارِ والرطوبةِ.`,
                        details: {
                            "ذهب": "عيار 24",
                            weight: "56 Kg"
                        },
                        price: new Price_1.default({
                            cost: 12334,
                            quantity: 1,
                            unit: "قطعة"
                        }), images: [
                            "https://www.iraqinhistory.com/images/phocagallery/Assyrian/thumbs/phoca_thumb_l_4%20(1203).jpg",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqyDThowDNbwTxxAhc4xtbs4FxXDyQclv80DCGwlaXdQ&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNcRduSHIahTn37r3IlmYpODQxpHdVlVD-oyCAmDHlxg&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwKs6SII5RR5wTOC_ulflqo09aimq39XXDJ_TuoFWXe3EQnR64FUB_R6V6ciGJzRqcIeY&usqp=CAU"
                        ]
                    }),
                    new Product_1.default({
                        name: "خوذة رياضية من ألياف الكربون",
                        description: `
                    خوذة رياضية خفيفة الوزن مصنوعة من ألياف الكربون. تتميز بتصميمها الديناميكي ومستوى الحماية العالي. مثالية لممارسة الرياضات الخطرة
                    `,
                        details: {
                            "ذهب": "عيار 24",
                            "الوزن": "500 g",
                            "المواد": "ألياف الكربون",
                            "الحجم": "متوفر بأحجام مختلفة",
                            "الاستخدام": "الحماية الشخصية، الرياضات الخطرة"
                        },
                        price: new Price_1.default({
                            cost: 5000,
                            quantity: 1,
                            unit: "قطعة"
                        }), images: [
                            "https://www.iraqinhistory.com/images/phocagallery/Assyrian/thumbs/phoca_thumb_l_4%20(1203).jpg",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqyDThowDNbwTxxAhc4xtbs4FxXDyQclv80DCGwlaXdQ&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNcRduSHIahTn37r3IlmYpODQxpHdVlVD-oyCAmDHlxg&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwKs6SII5RR5wTOC_ulflqo09aimq39XXDJ_TuoFWXe3EQnR64FUB_R6V6ciGJzRqcIeY&usqp=CAU"
                        ]
                    }),
                    new Product_1.default({
                        name: "خوذة ذهبية بنفسجية",
                        description: `
                    خوذة نادرة وفريدة من نوعها مصنوعة من الذهب البنفسجي. تتميز بتصميمها الاستثنائي ومستوى الحماية العالي. مثالية لهواة جمع التحف والقطع النادرة
                    `,
                        details: {
                            "ذهب": "عيار 24",
                            "الوزن": "500 g",
                            "المواد": "الذهب البنفسجي",
                            "الحجم": "متوفر بأحجام مختلفة",
                            "الاستخدام": "الحماية الشخصية، جمع التحف"
                        },
                        price: new Price_1.default({
                            cost: 300000,
                            quantity: 1,
                            unit: "قطعة"
                        }), images: [
                            "https://www.iraqinhistory.com/images/phocagallery/Assyrian/thumbs/phoca_thumb_l_4%20(1203).jpg",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqyDThowDNbwTxxAhc4xtbs4FxXDyQclv80DCGwlaXdQ&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNcRduSHIahTn37r3IlmYpODQxpHdVlVD-oyCAmDHlxg&s",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwKs6SII5RR5wTOC_ulflqo09aimq39XXDJ_TuoFWXe3EQnR64FUB_R6V6ciGJzRqcIeY&usqp=CAU"
                        ]
                    }),
                ];
                const entity = new Entity_1.default({
                    details: {
                        displayName: "الشركة العالمية للخوذ",
                        logo: "https://png.pngtree.com/background/20230519/original/pngtree-gold-samurai-helmet-sits-a-black-background-picture-image_2658564.jpg",
                        banner: "https://png.pngtree.com/background/20230519/original/pngtree-helmet-of-an-ancient-asian-warrior-in-an-elegant-setting-picture-image_2658563.jpg",
                        description: `

"الذهبيّة": تاجُ الأمانِ والفخامةِ
منذُ فجرِ التاريخِ، سعى الإنسانُ لحمايةِ نفسهِ من المخاطرِ، فكانَتْ الخوذةُ رمزًا للأمانِ والقوةِ.

اليومَ، تأتي "الذهبيّة" لتُعيدَ تعريفَ مفهومِ الخوذةِ، من خلالِ تصاميمَها الفريدةِ التي تُمزجُ بينَ الحمايةِ والفخامةِ.

تُقدمُ "الذهبيّة" مجموعةً واسعةً من الخوذاتِ المُصنوعةِ من أفضلِ الموادِ، بما في ذلكَ الذهبُ الخالصُ والذهبُ البنفسجيُ النادرُ.

تُصممُ خوذاتُ "الذهبيّة" بدقةٍ وعنايةٍ فائقةٍ، لضمانِ أقصى قدرٍ من الحمايةِ والراحةِ.

تُعدّ خوذاتُ "الذهبيّة" الخيارَ الأمثلَ لِمنْ يبحثُ عنَ قطعةٍ فريدةٍ تُكملُ مظهرَهُ وتُضفي عليهِ لمسةً من التميزِ.

مميزاتُ خوذاتِ "الذهبيّة":

مصنوعةٌ من أفضلِ الموادِ، بما في ذلكَ الذهبُ الخالصُ والذهبُ البنفسجيُ النادرُ.
تصاميمُ فريدةٌ من نوعهاِ تُمزجُ بينَ الحمايةِ والفخامةِ.
مُصنّعةٌ بدقةٍ وعنايةٍ فائقةٍ لضمانِ أقصى قدرٍ من الحمايةِ والراحةِ.
خياراتٌ واسعةٌ لتناسبُ جميعَ الأذواقِ والاحتياجاتِ.
منتجاتُ "الذهبيّة":

خوذاتُ ذهبيةٌ خالصةٌ عيار 24 قيراطًا.
خوذاتُ ذهبيةٌ بنفسجيةٌ نادرةٌ.
خوذاتُ رياضيةٌ مُصنوعةٌ من أليافِ الكربونِ خفيفةِ الوزنِ.
خوذاتُ عسكريةٌ مُصنوعةٌ من موادَ مُقاومةٍ للرصاصِ.
خوذاتُ مُخصصةٌ لرجالِ الإطفاءِ والشرطةِ.
"الذهبيّة": تاجُ الأمانِ والفخامةِ.
                    `,
                        categories: ["department_dfcd9b33"]
                    },
                    personas: {
                        supplier: new SupplierType_1.default({
                            products: products.map(product => product.id)
                        }),
                    },
                    roles
                });
                entity.save();
            }
            catch (error) {
            }
        });
        this.createDummySuppliers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.deleteAllDepartments();
                yield this.import_departments_intoMySQL();
                yield Entity_1.default.schema().deleteMany({});
                const roles = [new EntityRole_1.default({ name: "Owner - CEO", permissions: [Permission_1.Permission.CUSTOMER_ALL, Permission_1.Permission.SUPPLIER_ALL] }), new EntityRole_1.default({ name: "Customer CEO", permissions: [Permission_1.Permission.CUSTOMER_ALL] }), new EntityRole_1.default({ name: "Supplier CEO", permissions: [Permission_1.Permission.SUPPLIER_ALL] })];
                yield Product_1.default.schema().deleteMany({});
                const products = [];
                for (var i = 0; i < 100; i++) {
                    const product = new Product_1.default({
                        name: i + " " + (0, uuid_1.v4)(), description: (0, uuid_1.v4)(), details: { age: Math.floor(Math.random() * 100) }, price: new Price_1.default({ cost: Math.floor(Math.random() * 100000), quantity: Math.floor(Math.random() * 10), unit: "قطعة" }), images: [
                            "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpR8t5d3qqSlFY0WlLnIu6oLtHL0ps1bTuEg&usqp=CAU",
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTft1vTN55CiSMP7pRmliZKeYCwIglYC4AxgFTIVDMVhBPrVAVpuM3Jy9LFZioA_wPxip8&usqp=CAU",
                            "https://i.ytimg.com/vi/7SSu0KtXI2c/maxresdefault.jpg",
                        ]
                    });
                    yield product.save();
                    products.push(product);
                }
                const departments = yield Department_1.default.schema().find({});
                for (var i = 0; i < 50; i++) {
                    var entity = new Entity_1.default({
                        details: {
                            logo: "https://cdn.discordapp.com/attachments/729182998217359361/1216084583137939636/profile.png?ex=65ff1a06&is=65eca506&hm=51a952ecfea3dad049a0cc6ade98ebba7cf569bc6f028c7c16763e3813472873&",
                            banner: "https://cdn.discordapp.com/attachments/729182998217359361/1216082747190415431/background.jpeg?ex=65ff1850&is=65eca350&hm=56fdc416e39ab9c4d65b079e6cdcddbb23aae36b17b8c9eab9d41eae2b0cda1b&",
                            categories: [departments[Math.floor(Math.random() * (departments.length - 1))].id],
                            displayName: i + " " + (0, uuid_1.v4)().split("-")[0] + " Supplier Company Test SCT",
                            description: i + " " + " supplies dummy food."
                        },
                        personas: { supplier: new SupplierType_1.default({ products: products.filter(product => product.details.age < i).map(product => product.id) }) },
                        roles
                    });
                    yield entity.save();
                }
            }
            catch (error) {
                console.log(error);
            }
        });
        this.createDefaultDeveloperUser = (entities, roles) => __awaiter(this, void 0, void 0, function* () { return yield new User_1.default("Mostafa Adly", { username: "mostafaadly", password: "123123" }, entities[0].id, roles[0].id).save(); });
        this.data = data;
    }
}
exports.default = MongoDB;
