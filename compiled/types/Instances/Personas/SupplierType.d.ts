import { ObjectId } from "../../Types/ObjectId";
import Persona from "./Persona";
export default class SupplierType extends Persona {
    products: ObjectId[];
    constructor({ products }: {
        products: ObjectId[];
    });
}
