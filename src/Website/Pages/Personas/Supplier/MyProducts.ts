import Entity from "../../../../Instances/Entity";
import Page from "../../Page";

export default class MyProducts extends Page {
    private data: any;
    public static base_url: string = "/s/products";
    constructor(data: any, base_url?: string) {
        super(base_url || MyProducts.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // SUPPLIER - MY PRODUCTS PAGE
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity({}).load(user.entity);
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierProductsPage', { data: JSON.stringify({ user, entity }) });
        });
    }
}