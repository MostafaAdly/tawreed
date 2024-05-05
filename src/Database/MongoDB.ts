import mongoose from "mongoose";
import Department from '../Instances/Department';
import User from "../Instances/User";
import Entity from "../Instances/Entity";
import EntityRole from "../Instances/EntityRole";
import { Permission } from "../Instances/enums/Permission";
import Product from "../Instances/Product";
import SupplierType from "../Instances/Personas/SupplierType";
import Price from "../Instances/Price";
import { faker } from '@faker-js/faker/locale/ar';
import departments from '../DefaultData/departments.json'
import EntityCategory from "../Instances/EntityCategory";

export default class MongoDB {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    connect = async () => {
        if (!process.env.MONGODB_CONNECTION_STRING) return;
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(async () => {
            this.data.utils.print("Connected to MongoDB.", "MongoDB");
            // await this.eraseDatabase();
            // this.createFakerDummyData(false);
            // await this.deleteAllDepartments()
            // await this.import_departments_intoMySQL();
            // await this.createDummySuppliers();
            // await this.createSemiRealData();
            // await this.createData();
        }).catch((err) => {
            this.data.utils.error("Failed to connect to MongoDB");
            console.error(err);
            process.exit(1)
        });
    }
    disconnect = () => mongoose.disconnect();
    import_departments_intoMySQL = async (): Promise<any[]> => {
        const deps: any[] = [];
        for (const [key, value] of Object.entries(departments)) {
            const dep = new Department({ name: key, images: value });
            await dep.save();
            deps.push(dep);
        };
        return deps;
    }
    createData = async () => {

        const roles = await mongoose.models.EntityRole.find();

        const entityCategory = new EntityCategory(
            {
                name: "المنتجات",
                description: "قسم المنتجات",
                entity: new mongoose.Types.ObjectId(),
                products: [],
                ancestry: ""
            }
        )

        const entity = new Entity({
            details: {
                displayName: "المتكاملة للسفتي ",
                logo: "https://www.almotkamelasafety.com/wp-content/uploads/2021/05/logo.png",
                banner: "https://www.almotkamelasafety.com/wp-content/uploads/2021/05/logo.png",
                description:
                    `
Company Name: المتكاملة للسفتي (Integrated Safety Solutions)

Company Description:
Integrated Safety Solutions is a pioneering supplier company dedicated to providing comprehensive safety solutions tailored to meet the diverse needs of industries and businesses. With a commitment to excellence and innovation, we specialize in delivering top-of-the-line safety equipment, training, and consultancy services to ensure the highest standards of safety and security across various sectors.

At المتكاملة للسفتي, we understand the paramount importance of safety in every workplace environment. Therefore, our mission is to empower organizations with the tools and knowledge necessary to mitigate risks, prevent accidents, and foster a culture of safety awareness.
                `
            },
            personas: {
                supplier: new SupplierType({ products: [] }),
                customer: { requests: [] }
            },
            roles: roles.map(role => role._id),
            categories: [],
            departments: [new mongoose.Types.ObjectId("661e4b90496d7f617643f3fa")]
        });
        entityCategory.entity = entity._id;
        await entityCategory.save();
        entity.categories.push(entityCategory._id);
        await entity.save();
        const user = new User({
            displayName: "Safety Islam",
            credentials: { username: "safety_islam", password: "123123" },
            entity: entity._id,
            role: roles[0]._id
        });
        await user.save();
    }
    eraseDatabase = async () => {
        await mongoose.models.User.deleteMany({});
        await mongoose.models.Department.deleteMany({});
        await mongoose.models.Entity.deleteMany({});
        await mongoose.models.Product.deleteMany({});
        await mongoose.models.EntityCategory.deleteMany({});
        await mongoose.models.EntityRole.deleteMany({});
        await mongoose.models.Comment.deleteMany({});
        await mongoose.models.Request.deleteMany({});
        await mongoose.models.Payment.deleteMany({});
    }
    deleteAllDepartments = async () => {
        await mongoose.models.Department.deleteMany({});
    }
    deleteAllUsers = async () => {
        await mongoose.models.User.deleteMany({});
    }
    createEntityRoles = async () => {
        await mongoose.models.EntityRole.deleteMany();
        const roles = [
            new EntityRole({ name: "مدير الشركة", permissions: [Permission.CUSTOMER_ALL, Permission.SUPPLIER_ALL], priority: 5 }),
            new EntityRole({ name: "مدير قسم المشتريات", permissions: [Permission.CUSTOMER_ALL], priority: 50 }),
            new EntityRole({ name: "مدير قسم المبيعات", permissions: [Permission.SUPPLIER_ALL], priority: 50 })
        ];
        for (const role of roles)
            await role.save();
    }
    createFakerDummyData = async (erase = true) => {
        const timeTook_start = Date.now();
        if (erase)
            await this.eraseDatabase();
        const deps = await this.import_departments_intoMySQL();

        const roles = [
            new EntityRole({ name: "مدير الشركة", permissions: [Permission.CUSTOMER_ALL, Permission.SUPPLIER_ALL], priority: 5 }),
            new EntityRole({ name: "مدير قسم المشتريات", permissions: [Permission.CUSTOMER_ALL], priority: 50 }),
            new EntityRole({ name: "مدير قسم المبيعات", permissions: [Permission.SUPPLIER_ALL], priority: 50 })
        ];

        for (const role of roles)
            await role.save();

        const products: any[] = [];
        for (var i = 0; i < 200; i++) {
            const images: any[] = [];
            for (var h = 0; h < 5; h++) {
                images.push(faker.image.url());
            }
            const product = new Product({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                images,
                details: { rating: faker.number.int({ min: 1, max: 5 }), weight: Math.floor(Math.random() * 100) + " Kg", age: Math.floor(Math.random() * 100), material: faker.commerce.productMaterial() },
                price: new Price({ cost: parseInt(faker.commerce.price()), quantity: Math.floor(Math.random() * 5), unit: "دستة", currency: "جنيه مصري" })
            });
            await product.save();
            products.push(product);
        }

        const entities: any[] = [];

        for (var i = 0; i < 5; i++) {
            const entityProducts: any[] = [];
            for (var h = 0; h < Math.floor(Math.random() * (products.length / 2)); h++) {
                entityProducts.push(this.random(products)._id);
            }
            const entity = new Entity({
                details:
                {
                    displayName: faker.company.name(),
                    logo: faker.image.avatar(),
                    banner: faker.image.url(),
                    description: faker.company.catchPhrase(),
                },
                personas: {
                    supplier: new SupplierType({ products: entityProducts }),
                    customer: { requests: [] }
                },
                departments: [this.random(deps)._id],
                roles: roles.map(role => role._id),
                categories: []
            });

            const cats: EntityCategory[] = [];
            for (var h = 0; h < Math.floor(Math.random() * 2) + 1; h++) {
                const cat = new EntityCategory({
                    name: `Group ${faker.word.sample()}`,
                    description: faker.company.catchPhrase(),
                    entity: entity._id
                });
                await cat.createFakerChildren(products, entity, 3);
                cats.push(cat);
            }
            entity.categories = cats.map(cat => cat._id);
            entities.push(entity);
            await entity.save();
        }
        await this.createDefaultDeveloperUser(entities, roles);

        const users: any[] = [];
        for (var i = 0; i < 20; i++) {
            const user = new User({
                displayName: faker.internet.displayName(),
                credentials: { username: faker.internet.userName(), password: faker.internet.password() },
                entity: this.random(entities)._id, role: this.random(roles)._id
            });
            await user.save();
            users.push(user);
        }
        this.data.utils.print(`Took ${(Date.now() - timeTook_start) / 1000}sec to delete and create:`, "FAKER");
        this.data.utils.print(`Created ${roles.length} roles.`, "FAKER");
        this.data.utils.print(`Created ${products.length} products.`, "FAKER");
        this.data.utils.print(`Created ${entities.length} entities.`, "FAKER");
        this.data.utils.print(`Created ${(await mongoose.models.EntityCategory.find({})).length} categories.`, "FAKER");
        this.data.utils.print(`Created ${users.length} users.`, "FAKER");
    }
    random = (list: any[]) => list[Math.floor(Math.random() * list.length)];

    createDefaultDeveloperUser = async (entities: any[], roles: any[]) => await new User({
        displayName: "Mostafa Adly", credentials: { username: "mostafaadly", password: "123123" }, entity: entities[0]._id, role: roles[0]._id
    }).save()

}