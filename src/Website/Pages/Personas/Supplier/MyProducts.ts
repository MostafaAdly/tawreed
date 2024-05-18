import mongoose from "mongoose";
import Entity from "../../../../Instances/Entity";
import Page from "../../Page";
import { ObjectId } from "../../../../Types/ObjectId";
import { Unit } from "../../../../Instances/enums/Unit";

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

        // SUPPLIER - ADD PRODUCT
        this.router.get('/new', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const categories = this.getEndCategories(
                await mongoose.models.EntityCategory
                    .find({ entity: entity }).select(["name", "ancestry"]).exec());
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierAddProductPage',
                { data: JSON.stringify({ user, entity, categories }) });
        });

        // SUPPLIER - ADD CATEGORY
        this.router.get('/create-category', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ _id: user.entity });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL   
                return;
            }
            const ancestry = !req.query.ancestry ? "" : req.query.ancestry.replace('-', '/');
            this.data.server.next.render(req, res, '/Supplier/MyProducts/SupplierCreateCategoryPage',
                { data: JSON.stringify({ user, entity, ancestry }) });
        });
    }

    private getAllProducts = (categories: any[]): ObjectId[] => {
        let products: ObjectId[] = [];
        for (let category of categories)
            products = products.concat(category.products);
        return products.filter((item,
            index) => products.indexOf(item) === index);
    }

    private getEndCategories = (categories: any[]) => {
        let endCategories: any[] = [];
        let maxLength = 0;
        for (let category of categories) {
            const current = category.ancestry.split("/");
            if (current.length >= maxLength) {
                if (current.length > maxLength)
                    endCategories = [];
                maxLength = current.length;
                endCategories.push({ name: category.name, _id: category._id });
            }
        }
        return endCategories;
    }
}