import Persona from "./Persona";
import Request from "../Request";
export default class CustomerType extends Persona {
    requests: Request[];
    constructor();
    constructor({ requests }: {
        requests?: Request[];
    });
}
