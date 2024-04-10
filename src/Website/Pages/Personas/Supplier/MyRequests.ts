import Entity from "../../../../Instances/Entity";
import Page from "../../Page";
import mongoose from "mongoose";

export default class MyRequests extends Page {
    private data: any;
    public static base_url: string = "/s/requests";
    constructor(data: any, base_url?: string) {
        super(base_url || MyRequests.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // SUPPLIER - MY REQUESTS PAGE
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierRequestsPage', { data: JSON.stringify({ user, entity }) });
        });

        // SUPPLIER - MY ORDER 
        this.router.get('/order/:id', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierApproveOrderPage', { data: JSON.stringify({ user, entity }) });
        });

        // SUPPLIER - MY RFQ 
        this.router.get('/rfq/:id', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Supplier/MyRequests/SupplierApproveRFQPage', { data: JSON.stringify({ user, entity }) });
        });
    }
}