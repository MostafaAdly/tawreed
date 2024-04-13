import Entity from "../../../../Instances/Entity";
import Page from "../../Page";
import mongoose from "mongoose";

export default class MyPayments extends Page {
    private data: any;
    public static base_url: string = "/s/payments";
    constructor(data: any, base_url?: string) {
        super(base_url || MyPayments.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // SUPPLIER - MY Payments PAGE
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const payments = await mongoose.models.Payment
                .find({ supplier: entity._id })
                .populate({ path: 'request', populate: { path: 'product', select: ["price", "productId"] } })
                .populate({ path: 'supplier', select: 'entityId' }).exec();
            this.data.server.next
                .render(req, res, '/Supplier/Payments/SupplierPaymentsPage',
                    { data: JSON.stringify({ user, entity, payments }) });
        });

    }
}