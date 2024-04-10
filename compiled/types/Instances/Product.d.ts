import Price from "./Price";
import { ObjectId } from "../Types/ObjectId";
export default class Product {
    _id: ObjectId;
    productId: string;
    name: string;
    description: string;
    details: any;
    images: string[];
    price: Price;
    constructor();
    constructor({ id }: {
        id: string;
    });
    constructor({ name, description, details, price, images }: {
        name: string;
        description: string;
        details: any;
        price: Price;
        images: string[];
    });
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
