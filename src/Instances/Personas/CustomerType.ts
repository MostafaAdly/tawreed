import Persona from "./Persona";
import Request from "../Request";

export default class CustomerType extends Persona {

    public requests: Request[] = [];

    constructor();
    constructor({ requests }: { requests?: Request[] })
    constructor(input?: any) {
        super();
        if (input) Object.assign(this, input);
    }
}