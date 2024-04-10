import User from "../../../Instances/User";
import Page from "../Page";
export default class Login extends Page {
    private data;
    private reasons;
    static base_url: string;
    constructor(data: any, base_url?: string);
    private run;
    hasCustomerAndSupplierPermissions(user: User): boolean;
    hasCustomerPermissions(user: User): boolean;
    hasSupplierPermissions(user: User): boolean;
    static validateCredentials(credentials: {
        username: string;
        password: string;
    }): Promise<boolean>;
    private validateCredentialsToUser;
}
