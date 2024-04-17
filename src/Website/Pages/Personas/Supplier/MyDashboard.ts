import Page from "../../Page";
import Entity from "../../../../Instances/Entity";

export default class MyDashboard extends Page {
    private data: any;
    public static base_url: string = "/s/dashboard";
    constructor(data: any, base_url?: string) {
        super(base_url || MyDashboard.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // SUPPLIER - DASHBOARD PAGE
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity }) as any;
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            this.data.server.next
                .render(req, res, '/Supplier/Dashboard/SupplierDashboardPage',
                    { data: JSON.stringify({ user, entity }) });
        });
    }
}