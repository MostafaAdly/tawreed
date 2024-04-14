import Page from "../../../Page";
import Entity from "../../../../../Instances/Entity";
import mongoose from "mongoose";

export default class CustomerRequests extends Page {
    private data: any;
    public static base_url: string = "/c/requests";
    constructor(data: any, base_url?: string) {
        super(base_url || CustomerRequests.base_url)
        this.data = data;
        this.run();
    }

    private run() {

        // ALL REQUESTS OF A CUSTOMER ENTITY
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const requests = await mongoose.models.Request
                .find({ customer: entity._id })
                .populate('product').exec();
            this.data.server.next.render(req, res, '/Customer/Profile/CustomerRequests', { data: JSON.stringify({ user, supplier: entity, requests }) });
        });
    }
}