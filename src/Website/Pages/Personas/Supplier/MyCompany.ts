import mongoose from "mongoose";
import Page from "../../Page";
import Entity from "../../../../Instances/Entity";

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
            const entity = await new Entity().load({ _id: user.entity }) as any;
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            entity.users = (await mongoose.models.User
                .find({ entity: entity._id })
                .populate('role').exec())
            this.data.server.next
                .render(req, res, '/Supplier/MyCompany/SupplierCompanyPage',
                    { data: JSON.stringify({ user, entity }) });
        });

        // SUPPLIER - MY COMPANY PAGE - ADD USER
        this.router.get('/profile/add-user', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity }) as any;
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            this.data.server.next
                .render(req, res, '/Supplier/MyCompany/SupplierAddUserPage',
                    { data: JSON.stringify({ user, entity }) });
        });



    }
}