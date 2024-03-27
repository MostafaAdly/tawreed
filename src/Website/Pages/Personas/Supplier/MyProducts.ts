import Entity from "../../../../Instances/Entity";
import EntityCategory from "../../../../Instances/EntityCategory";
import Product from "../../../../Instances/Product";
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
            const categories = await EntityCategory.schema().find({ entity: entity.id })
            const products = await Product.schema().find({ id: { "$in": this.getAllProducts(categories) } });
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierProductsPage', { data: JSON.stringify({ user, entity, categories, products }) });
        });
    }

    private getAllProducts = (categories: any[]): String[] => {
        let products: String[] = [];
        for (let category of categories)
            products = products.concat(category.products);
        return products.filter((item,
            index) => products.indexOf(item) === index);
    }
}