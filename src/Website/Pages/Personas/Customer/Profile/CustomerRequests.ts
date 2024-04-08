import Product from "../../../../../Instances/Product";
import Page from "../../../Page";
import Entity from "../../../../../Instances/Entity";

export default class CustomerRequests extends Page {
    private data: any;
    public static base_url: string = "/c/requests";
    constructor(data: any, base_url?: string) {
        super(base_url || CustomerRequests.base_url)
        this.data = data;
        this.run();
    }

    private run() {

        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await Entity.schema().findOne({ id: user.entity });
            const products = await Product.schema().find({ id: { $in: entity.personas.supplier.products } });
            this.data.server.next.render(req, res, '/Customer/Profile/CustomerRequests', { data: JSON.stringify({ user, supplier: entity, products }) });
        });
    }
}