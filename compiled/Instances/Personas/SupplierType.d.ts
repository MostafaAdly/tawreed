import CustomProduct from '../Custom/CustomProduct';
import Persona from "./Persona";
export default class SupplierType extends Persona {
    products: CustomProduct[];
    constructor(products: CustomProduct[]);
}
