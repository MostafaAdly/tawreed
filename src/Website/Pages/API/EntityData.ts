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
        this.router.post('/description', async (req: any, res: any) => {
            const { token, userId, entityId, description } = req.body;
            if (!token || !userId || !entityId || description.replaceAll(" ", "") == "") return res.status(400).send({ message: "Invalid request", error: 1 });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            await mongoose.models.Entity.updateOne({ _id: entityId }, { "details.description": description }).exec();
            return res.send({ message: "Entity - Description updated successfully", success: 1 });
        });
    }
}