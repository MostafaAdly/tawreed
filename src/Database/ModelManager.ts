import mongoose, { Schema } from "mongoose";
import DepartmentSchema from "./Schema/DepartmentSchema";
import EntitySchema from "./Schema/EntitySchema";
import UserSchema from "./Schema/UserSchema";
import ProductSchema from "./Schema/ProductSchema";
import EntityRoleSchema from "./Schema/EntityRoleSchema";
import EntityCategorySchema from "./Schema/EntityCategorySchema";
import Department from "../Instances/Department";
import CommentSchema from "./Schema/CommentSchema";
import RequestSchema from "./Schema/RequestSchema";

export default class ModelManager {

    private idSchema = {
        enabled: false,
        key: "id",
        value: {
            type: mongoose.Types.ObjectId,
            required: true,
            default: new mongoose.Types.ObjectId(),
            // unique: true,
            // alias: "_id",
            get: (v: mongoose.Types.ObjectId) => v.toString(),
            set: (v: string) => v ? new mongoose.Types.ObjectId(v) : new mongoose.Types.ObjectId()
        }
    };

    private options = {
        versionKey: false, timestamps: true, _id: true
    }

    public populateModels = async () => {
        const input = { id: this.idSchema, options: this.options };

        const schemas = [
            new DepartmentSchema(input),
            new EntitySchema(input),
            new UserSchema(input),
            new ProductSchema(input),
            new EntityCategorySchema(input),
            new EntityRoleSchema(input),
            new CommentSchema(input),
            new RequestSchema(input)
        ];

        schemas.forEach(schema => {
            this.schemaManipulate(schema);
            mongoose.model(schema.model, schema);
        });

        await this.testDatabase();
    }

    private schemaManipulate = (schema: Schema) => {
        // schema.method('toClient', function () {
        //     var obj = this.toObject() as any;
        //     obj.id = obj._id.toString();
        //     delete obj._id;
        //     return obj;
        // });
        //     schema.plugin((schema, options) => {
        //         schema.virtual('loadedAt').
        //             get(function () { console.log(this._loadedAt); return this._loadedAt; }).
        //             set(function (v) { this._loadedAt = v; });

        //         // schema.post(['find', 'findOne'], function (docs) {
        //         //     if (!Array.isArray(docs)) docs = [docs];

        //         //     const now = new Date();
        //         //     for (var doc of docs) {
        //         //         doc.id = doc._id;
        //         //         delete doc._id
        //         //     }
        //         //     console.log(docs[0])
        //         // });
        //     });
    }

    public static loadOne = async (className: string, query: any) => {
        const doc = (await mongoose.models[className].findOne(query).exec())?.toObject();
        if (!doc) return doc;
        // doc.id = doc._id.toString();
        // delete doc._id;
        return doc;
    }

    public static save = async (className: string, object: any) => {
        await new mongoose.models[className](object).save();
    }

    private testDatabase = async () => {
        // const Department = mongoose.models.Department;
        // const Entity = mongoose.models.Entity;
        // const User = mongoose.models.User;
        // const Product = mongoose.models.Product;
        // const EntityCategory = mongoose.models.EntityCategory;
        // const EntityRole = mongoose.models.EntityRole;


        const dep = await new Department().load({});
        // console.log(dep)

        // await Department.updateOne({ _id: dep._id }, { name: "New Name" }).exec();
        // console.log((await Department.findOne({})));
    }
}