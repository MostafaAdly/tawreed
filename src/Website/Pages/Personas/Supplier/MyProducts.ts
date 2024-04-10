import mongoose from "mongoose";
import Entity from "../../../../Instances/Entity";
import Page from "../../Page";
import { ObjectId } from "../../../../Types/ObjectId";

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
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const categories = await mongoose.models.EntityCategory.find({ entity: entity._id })
            const products = await mongoose.models.Product.find({ _id: { $in: this.getAllProducts(categories) } });
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierProductsPage', { data: JSON.stringify({ user, entity, categories, products }) });
        });
    }

    private getAllProducts = (categories: any[]): ObjectId[] => {
        let products: ObjectId[] = [];
        for (let category of categories)
            products = products.concat(category.products);
        return products.filter((item,
            index) => products.indexOf(item) === index);
    }
}