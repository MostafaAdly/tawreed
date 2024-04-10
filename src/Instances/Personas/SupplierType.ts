import { ObjectId } from "../../Types/ObjectId";
import Persona from "./Persona";
export default class SupplierType extends Persona {

    public products: ObjectId[] = [];

    constructor({ products }: { products: ObjectId[] });
    constructor(input?: any) {
        super();
        if (input) Object.assign(this, input);
    }
}