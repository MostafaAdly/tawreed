import mongoose from "mongoose";
import Department from "../../../../../Instances/Department";
import Page from "../../../Page";

export default class Home extends Page {
    private data: any;
    public static base_url: string = "/c";
    constructor(data: any, base_url?: string) {
        super(base_url || Home.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // HOME PAGE
        this.router.get(['/', '/home'], async (req: any, res: any) => {
            const departments = await mongoose.models.Department.find({});
            const user = req.session.user;
            this.data.server.next.render(req, res, '/Customer/Home/HomePage', { data: JSON.stringify({ departments, user }) });
        });
    }
}