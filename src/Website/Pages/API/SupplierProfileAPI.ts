import mongoose from "mongoose";
import User from "../../../Instances/User";
import Page from "../Page";

export default class SupplierProfileAPI extends Page {
    private data: any;
    public static base_url: string = "/profile";
    constructor(data: any, base_url?: string) {
        super(base_url + SupplierProfileAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/add-user', async (req: any, res: any) => {
            const { userId, token, entityId } = req.body;
            if (!token || !userId || !entityId) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            if (await new User()._load({ $or: [{ "credentials.username": req.body.username }, { "details.email": req.body.email }] }))
                return res.status(400).send({ message: "User already exists", error: 1 });
            const user = new User({
                displayName: req.body.displayName,
                details: {
                    nickname: req.body.nickname,
                    phone: req.body.phone,
                    email: req.body.email
                },
                credentials: {
                    username: req.body.username,
                    password: req.body.password
                },
                entity: new mongoose.Types.ObjectId(entityId),
                role: new mongoose.Types.ObjectId(req.body.role)
            });
            await user.save();
            return res.send({ message: "User successfully created", success: 1 });
        });
    }
}