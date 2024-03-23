import Persona from "./Persona";

export default class CustomerType extends Persona {

    public users: string[] = [];
    constructor(users: string[]) {
        super();
        this.users = users;
    }
}