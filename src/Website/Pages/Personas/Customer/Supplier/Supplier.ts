import Product from "../../../../../Instances/Product";
import Page from "../../../Page";
import Entity from "../../../../../Instances/Entity";
import mongoose from "mongoose";

export default class Supplier extends Page {
    private data: any;
    public static base_url: string = "/c/suppliers";
    constructor(data: any, base_url?: string) {
        super(base_url || Supplier.base_url)
        this.data = data;
        this.run();
    }

    private run() {

        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/', async (req: any, res: any) => {
            return res.status(200).redirect('/home#departments');
        });

        // SUPPLIER BY ID
        this.router.get('/:id', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ entityId: req.params.id });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const products = await mongoose.models.Product.find({ _id: { $in: entity.personas.supplier?.products || [] } });
            this.data.server.next.render(req, res, '/Customer/Supplier/SupplierPage', { data: JSON.stringify({ user, supplier: entity, products }) });
        });

        // ALL PRODUCTS OF A SUPPLIERS OF A DEPARTMENT
        this.router.get('/:supplierId/products', async (req: any, res: any) => {
            return res.status(200).redirect(`/c/suppliers/${req.params.supplierId}`);
        });

        // PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ entityId: req.params.supplierId });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const product = await new Product().load({ productId: req.params.productId });
            if (!product) {
                // TODO: HANDLE PRODUCT IF NULL
                return;
            }
            const comments = await mongoose.models.Comment
                .find({ product: product._id })
                .populate({
                    path: 'user', select: ["displayName", "image"],
                    populate: [{ path: 'role', select: "name" }, { path: "entity", select: "details.displayName" }]
                }).exec();
            user.entity = await new Entity().load({ _id: user.entity });
            this.data.server.next.render(req, res, '/Customer/Supplier/ProductPage',
                { data: JSON.stringify({ user, supplier: entity, product, comments }) });
        });

        // RFQ FOR PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId/rfq', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ entityId: req.params.supplierId });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            const product = await new Product().load({ productId: req.params.productId });
            if (!product) {
                // TODO: HANDLE PRODUCT IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Customer/Supplier/RequestForQuotation', { data: JSON.stringify({ user, supplier: entity, product }) });
        });

        // RFQ REQUESTED FOR PRODUCT BY ID FOR A SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId/rfq/sent', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await new Entity().load({ entityId: req.params.supplierId });
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/Customer/Supplier/RFQ_Requested', { data: JSON.stringify({ user, supplier: entity }) });
        });

    }
}