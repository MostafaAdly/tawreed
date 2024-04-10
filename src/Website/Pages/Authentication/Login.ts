import mongoose from "mongoose";
import Entity from "../../../Instances/Entity";
import { Permission } from "../../../Instances/Permission";
import User from "../../../Instances/User";
import Page from "../Page";
import Home from '../Personas/Customer/Home/Home';
import MyCompany from "../Personas/Supplier/MyCompany";
import { ObjectId } from "../../../Types/ObjectId";

export default class Login extends Page {
    private data: any;
    private reasons: any = {
        "1": "Username or password is incorrect."
    }
    public static base_url: string = "/login";
    constructor(data: any, base_url?: string) {
        super(base_url || Login.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.get("/", (req: any, res: any) => {
            this.data.server.next.render(req, res, '/Authentication/LoginPage', {});
        });

        this.router.post("/", async (req: any, res: any) => {
            const credentials = req.body;
            const validatedUser = await this.validateCredentialsToUser(credentials);

            if (!validatedUser)
                return res.status(200).redirect(`/login?error=${validatedUser.entity ? 2 : 1}`);

            const isTotallyValid = this.hasCustomerAndSupplierPermissions(validatedUser);
            const isPartiallyValid = this.hasCustomerPermissions(validatedUser);
            this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);

            if (isTotallyValid)
                return res.status(200).redirect("/");

            return res.status(200).redirect(isPartiallyValid ? (Home.base_url + `/#departments`) : MyCompany.base_url);
        });
    }

    public hasCustomerAndSupplierPermissions(user: User): boolean {
        return this.hasCustomerPermissions(user) && this.hasSupplierPermissions(user);
    }

    public hasCustomerPermissions(user: User): boolean {
        const list = user.entity.roles.find((role: ObjectId) => role._id == user.role)?.permissions;
        return user.role != null && list != null && list.includes(Permission.CUSTOMER_ALL);
    }

    public hasSupplierPermissions(user: User): boolean {
        const list = user.entity.roles.find((role: ObjectId) => role._id == user.role)?.permissions;
        return user.role != null && list != null && list.includes(Permission.SUPPLIER_ALL);
    }

    public static async validateCredentials(credentials: { username: string, password: string }): Promise<boolean> {
        const user = (await new User()._load({ 'credentials.username': credentials.username.toLowerCase() }));
        return user?.credentials?.password == credentials.password;
    }

    private async validateCredentialsToUser(credentials: { username: string, password: string }): Promise<any> {
        return await mongoose.models.User.findOne({ 'credentials.username': credentials.username.toLowerCase(), 'credentials.password': credentials.password }).populate('entity')
    }

}