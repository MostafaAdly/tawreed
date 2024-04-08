import Price from "./Price";
export default class Product {
    id: string;
    name: string;
    description: string;
    details: any;
    images: string[];
    price: Price;
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
    load(): Promise<void>;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
