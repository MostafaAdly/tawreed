import Entity from "../../../Instances/Entity";
import EntityCategory from "../../../Instances/EntityCategory";
import { EntityType } from "../../../Instances/enums/EntityType";
import CustomerType from "../../../Instances/Personas/CustomerType";
import SupplierType from "../../../Instances/Personas/SupplierType";
import User from "../../../Instances/User";
import Page from "../Page";
import mongoose from "mongoose";

export default class EntityData extends Page {
    private data: any;
    public static base_url: string = "/entity";
    constructor(data: any, base_url?: string) {
        super(base_url + EntityData.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/create', async (req: any, res: any) => {
            const { token, userId, entity: entityData, user: userData } = req.body;
            if (!token || !entityData || !userData) return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            const department = await mongoose.models.Department.findOne({ _id: entityData.department }).exec();
            if (!department) return res.status(400).send({ message: "Invalid department", error: 1 });
            const loadedUser = await mongoose.models.User.findOne({ 'credentials.username': userData.username }).exec();
            if (loadedUser) return res.status(400).send({ message: "User already exists", error: 1 });
            const entity = new Entity({
                type: entityData.type,
                details: {
                    description: entityData.description,
                    displayName: entityData.displayName,
                    logo: "https://w7.pngwing.com/pngs/29/173/png-transparent-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-trademark.png",
                    banner: "https://w7.pngwing.com/pngs/29/173/png-transparent-null-pointer-symbol-computer-icons-pi-miscellaneous-angle-trademark.png"
                },
                personas: {
                    supplier: new SupplierType({ products: [] }),
                    customer: new CustomerType({ requests: [] }),
                },
                roles: await mongoose.models.EntityRole.find({}).exec(),
                departments: [department._id],
            });
            entity.categories.push(await this.createDefaultCategory(entity));
            const user = new User({
                displayName: userData.displayName,
                credentials: {
                    username: userData.username,
                    password: userData.password
                },
                entity: entity._id,
                role: new mongoose.Types.ObjectId(userData.role),
                admin: false
            });
            await entity.save();
            await user.save();
            return res.send({ message: "Entity created successfully", success: 1 });
        });
        this.router.post('/description', async (req: any, res: any) => {
            const { token, userId, entityId, description } = req.body;
            if (!token || !userId || !entityId || description.replaceAll(" ", "") == "") return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            await mongoose.models.Entity.updateOne({ _id: entityId }, { "details.description": description }).exec();
            return res.send({ message: "Entity - Description updated successfully", success: 1 });
        });
    }

    private createDefaultCategory = async (entity: any) => {
        const category = new EntityCategory({
            name: "Default",
            description: "Default category",
            parent: "",
            entity: entity._id
        });
        await category.save();
        return category;
    }
}