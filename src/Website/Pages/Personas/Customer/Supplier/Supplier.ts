import Product from "../../../../../Instances/Product";
import Page from "../../../Page";
import Entity from "../../../../../Instances/Entity";

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
            const entity = await Entity.schema().findOne({ id: req.params.id });
            const products = await Product.schema().find({ id: { $in: entity.personas.supplier.products } });
            this.data.server.next.render(req, res, '/Customer/Supplier/SupplierPage', { data: JSON.stringify({ user, supplier: entity, products }) });
        });

        // ALL PRODUCTS OF A SUPPLIERS OF A DEPARTMENT
        this.router.get('/:supplierId/products', async (req: any, res: any) => {
            return res.status(200).redirect(`/c/suppliers/${req.params.supplierId}`);
        });

        // PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await Entity.schema().findOne({ id: req.params.supplierId });
            const product = await Product.schema().findOne({ id: req.params.productId });
            this.data.server.next.render(req, res, '/Customer/Supplier/ProductPage', { data: JSON.stringify({ user, supplier: entity, product }) });
        });

        // RFQ FOR PRODUCT BY ID OF SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId/rfq', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await Entity.schema().findOne({ id: req.params.supplierId });
            const product = await Product.schema().findOne({ id: req.params.productId });
            this.data.server.next.render(req, res, '/Customer/Supplier/RequestForQuotation', { data: JSON.stringify({ user, supplier: entity, product }) });
        });

        // RFQ REQUESTED FOR PRODUCT BY ID FOR A SUPPLIER BY ID
        this.router.get('/:supplierId/products/:productId/rfq/sent', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await Entity.schema().findOne({ id: req.params.supplierId });
            const product = await Product.schema().findOne({ id: req.params.productId });
            this.data.server.next.render(req, res, '/Customer/Supplier/RFQ_Requested', { data: JSON.stringify({ user, supplier: entity, product }) });
        });

    }
}