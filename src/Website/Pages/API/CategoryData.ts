import EntityCategory from "../../../Instances/EntityCategory";
import Page from "../Page";
import mongoose from "mongoose";

export default class CategoryData extends Page {
    private data: any;
    public static base_url: string = "/category";
    constructor(data: any, base_url?: string) {
        super(base_url + CategoryData.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/create', async (req: any, res: any) => {
            const { token, userId, entity, ancestry, name, description } = req.body;
            if (!token || !userId || !entity || !ancestry || !name || description.replaceAll(" ", "") == "") return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            const category = new EntityCategory({ name, description, entity, ancestry });
            await category.save();
            return res.send({ message: "Category created successfully", success: 1 });
        });

        this.router.post('/description', async (req: any, res: any) => {
            const { token, userId, categoryId, description } = req.body;
            if (!token || !userId || !categoryId || description.replaceAll(" ", "") == "") return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            await mongoose.models.EntityCategory.updateOne({ _id: categoryId }, { "description": description }).exec();
            return res.send({ message: "Category - Description updated successfully", success: 1 });
        });
    }
}