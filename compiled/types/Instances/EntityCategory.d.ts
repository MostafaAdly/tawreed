import Product from "./Product";
import Entity from "./Entity";
export default class EntityCategory {
    id: string;
    name: string;
    description: string;
    entity: string;
    products: string[];
    private ancestry;
    constructor(id: string);
    constructor({ name, description, entity, ancestry }: {
        name: string;
        description: string;
        entity: string;
        ancestry?: string;
    });
    load: () => Promise<this | undefined>;
    setId(id: string): EntityCategory;
    setProducts(products: string[]): EntityCategory;
    createFakerChildren(products: Product[], entity: Entity, amount: number): Promise<void>;
    private random;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
