import mongoose from "mongoose";
import { Permission } from "../../../Instances/enums/Permission";
import User from "../../../Instances/User";
import Page from "../Page";
import Home from '../Personas/Customer/Home/Home';
import MyCompany from "../Personas/Supplier/MyCompany";

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
            this.data.server.next.render(req, res, '/Authentication/LoginPage', { data: JSON.stringify({ error: req.query.error }) });
        });

        this.router.post("/", async (req: any, res: any) => {
            const credentials = req.body;
            console.log(credentials)
            const validatedUser = await this.validateCredentialsToUser(credentials);

            if (!validatedUser)
                return res.status(200).redirect(`/login?error=${validatedUser?.entity ? 2 : 1}`);
            const isCustomerValid = this.hasPermissions(validatedUser, 1);
            const isSupplierValid = this.hasPermissions(validatedUser, 2);
            this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);

            if (isCustomerValid && isSupplierValid)
                return res.status(200).redirect("/");

            return res.status(200).redirect(isCustomerValid ? (Home.base_url + `/#departments`) : MyCompany.base_url);
        });
    }

    public hasPermissions(user: User, persona: number): boolean {
        const permissions: Permission[] = persona == 0 ? Object.values(Permission) : [];
        if (persona == 1) permissions.push(Permission.CUSTOMER_ALL);
        else if (persona == 2) permissions.push(Permission.SUPPLIER_ALL);
        const found = user.entity.roles.includes(user.role._id);
        return user.role != null && user.role.permissions != null && permissions.every((permission: Permission) => user.role.permissions.includes(permission));
    }

    public static async validateCredentials(credentials: { username: string, password: string }): Promise<boolean> {
        const user = (await new User()._load({ 'credentials.username': credentials.username.toLowerCase() }));
        return user?.credentials?.password == credentials.password;
    }

    private async validateCredentialsToUser(credentials: { username: string, password: string }): Promise<any> {
        return (await mongoose.models.User.findOne({ 'credentials.username': credentials.username.toLowerCase(), 'credentials.password': credentials.password })
            .populate({ path: 'entity' }).populate('role'))?.toObject();
    }

}