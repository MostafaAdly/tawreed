import Persona from "./Persona";
export default class SupplierType extends Persona {
    products: string[];
    constructor({ products }: {
        products: string[];
    });
}
