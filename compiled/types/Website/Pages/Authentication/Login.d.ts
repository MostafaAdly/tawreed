import Entity from "../../../Instances/Entity";
import User from "../../../Instances/User";
import Page from "../Page";
export default class Login extends Page {
    private data;
    private reasons;
    static base_url: string;
    constructor(data: any, base_url?: string);
    private run;
    hasCustomerAndSupplierPermissions(user: User, entity: Entity): boolean;
    hasCustomerPermissions(user: User, entity: Entity): boolean;
    hasSupplierPermissions(user: User, entity: Entity): boolean;
    static validateCredentials(credentials: {
        username: string;
        password: string;
    }): Promise<boolean>;
    private validateCredentialsToUser;
}
