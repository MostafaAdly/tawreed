import Product from "./Product";
import Entity from "./Entity";
import { ObjectId } from "../Types/ObjectId";
export default class EntityCategory {
    _id: ObjectId;
    categoryId: string;
    name: string;
    description: string;
    entity: ObjectId;
    products: ObjectId[];
    private ancestry;
    constructor(_id: ObjectId);
    constructor({ name, description, entity, ancestry }: {
        name: string;
        description: string;
        entity: ObjectId;
        ancestry?: string;
    });
    setId(id: ObjectId): EntityCategory;
    setProducts(products: ObjectId[]): EntityCategory;
    createFakerChildren(products: Product[], entity: Entity, amount: number): Promise<void>;
    private random;
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
