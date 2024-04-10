import mongoose from "mongoose";
import Page from "../../Page";

export default class MyCompany extends Page {
    private data: any;
    public static base_url: string = "/s";
    constructor(data: any, base_url?: string) {
        super(base_url || MyCompany.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // SUPPLIER - MY COMPANY PAGE
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = (await mongoose.models.Entity.findOne({ _id: new mongoose.Types.ObjectId(user.entity) })).toObject();
            entity.users = (await mongoose.models.User.find({ entity: entity._id }).populate('role').exec())
            this.data.server.next.render(req, res, '/Supplier/MyCompany/SupplierCompanyPage', { data: JSON.stringify({ user, entity }) });
        });
    }
}