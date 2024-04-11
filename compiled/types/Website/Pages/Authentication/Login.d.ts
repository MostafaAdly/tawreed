import User from "../../../Instances/User";
import Page from "../Page";
export default class Login extends Page {
    private data;
    private reasons;
    static base_url: string;
    constructor(data: any, base_url?: string);
    private run;
    hasPermissions(user: User, persona: number): boolean;
    static validateCredentials(credentials: {
        username: string;
        password: string;
    }): Promise<boolean>;
    private validateCredentialsToUser;
}
