import mongoose from "mongoose";
import Request from "../../../Instances/Request";
import { ResponseType } from "../../../Instances/ResponseType";
import Page from "../Page";

export default class RequestStateAPI extends Page {
    private data: any;
    public static base_url: string = "/request";
    constructor(data: any, base_url?: string) {
        super(base_url + RequestStateAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/', async (req: any, res: any) => {
            const { requestId, userId, token, state } = req.body;
            if (!requestId || !token || !userId || !state) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            if (!Object.keys(ResponseType).includes(state)) return res.status(400).send({ message: "Invalid state" });
            if (!await new Request().load({ _id: requestId })) return res.status(404).send({ message: "Request not found" });
            mongoose.models.Request.updateOne({ _id: requestId }, { responseType: (ResponseType as any)[state] }).exec();
            return res.send({ message: "Request state updated successfully", success: 1 });
        });
        this.router.delete('/delete', async (req: any, res: any) => {
            const { requestId, userId, token } = req.body;
            if (!requestId || !token || !userId) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            if (!await new Request().load({ _id: requestId })) return res.status(404).send({ message: "Request not found" });
            mongoose.models.Request.deleteOne({ _id: requestId }).exec();
            return res.send({ message: "Request deleted successfully", success: 1 });
        });
    }
}