import mongoose from "mongoose";
import User from "../../../Instances/User";
import Page from "../Page";
import fs from 'fs'
import Product from "../../../Instances/Product";
import MyProducts from "../Personas/Supplier/MyProducts";

export default class SupplierProfileAPI extends Page {
    private data: any;
    public static base_url: string = "/profile";
    constructor(data: any, base_url?: string) {
        super(base_url + SupplierProfileAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/user', async (req: any, res: any) => {
            const { userId, token, entityId, user_id } = req.body;
            if (!token || !userId || !entityId) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            const userBody = {
                displayName: req.body.displayName,
                details: {
                    nickname: req.body.nickname,
                    phone: req.body.phone,
                    email: req.body.email
                },
                credentials: {
                    username: req.body.username,
                    password: req.body.password
                },
                entity: new mongoose.Types.ObjectId(entityId),
                role: new mongoose.Types.ObjectId(req.body.role)
            };
            if (!user_id) {
                if (await new User()._load({ $or: [{ "credentials.username": req.body.username }, { "details.email": req.body.email }] }))
                    return res.status(400).send({ message: "User already exists", error: 1 });
                const user = new User(userBody);
                await user.save();
            } else {
                if (!await new User()._load({ _id: req.body.user_id })) return res.status(404).send({ message: "User not found", error: 1 });
                await mongoose.models.User.updateOne({ _id: req.body.user_id }, userBody);
                return res.send({ message: "User successfully updated", success: 1 });
            }
            return res.send({ message: "User successfully created", success: 1 });
        });

        this.router.post('/product',
            this.data.server.multer.array('images', 12),
            async (req: any, res: any) => {
                const { userId, token } = req.body;
                if (!token || !userId) return res.status(400).send({ message: "Invalid request" });
                const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
                if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
                const category = await mongoose.models.EntityCategory.findOne({ _id: req.body.category });
                if (!category) return res.status(404).send({ message: "Category not found", error: 1 });

                const productToSave = new Product({
                    name: req.body.name,
                    description: req.body.description,
                    details: req.body.details || {},
                    price: {
                        cost: req.body.cost,
                        quantity: req.body.quantity,
                        unit: req.body.unit
                    },
                    images: req.files.map((file: any) => "/products/" + file.filename)
                });
                await productToSave.save();
                const product = await mongoose.models.Product.findOne({
                    productId: productToSave.productId
                });
                await mongoose.models.EntityCategory.updateOne({ _id: category._id }, { $push: { products: product._id } }).exec();
                return res.status(301).redirect(MyProducts.base_url);
            })
    }
}