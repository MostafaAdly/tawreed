
import Page from "../Page";
import mongoose from "mongoose";

export default class Entities extends Page {
    private data: any;
    public static base_url: string = "/entities";
    constructor(data: any, base_url?: string) {
        super(base_url || Entities.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // ADMIN @ GET /entities
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            if (!user.admin)
                return res.status(301).redirect("/");
            const entities = await mongoose.models.Entity.find({});
            this.data.server.next.render(req, res, '/Admin/Entities/AdminEntitiesPage', {
                data: JSON.stringify({
                    user,
                    entities
                })
            });
        });
    }
}