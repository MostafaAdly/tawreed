import Persona from "./Persona";
export default class SupplierType extends Persona {

    public products: string[] = [];

    constructor({ products }: { products: string[] });
    constructor(input: any) {
        super();
        this.products = input.products;
    }
}