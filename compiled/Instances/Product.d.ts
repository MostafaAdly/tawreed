export default class Product {
    id: string;
    name: string;
    description: string;
    details: any;
    constructor(id: string);
    constructor(id: string, name: string, description: string, details: any);
    load(): Promise<void>;
    private static model;
    static schema: () => any;
    save: () => Promise<any>;
}
