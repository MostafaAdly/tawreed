import Entity from "../../../Instances/Entity";
import { Permission } from "../../../Instances/Personas/Permission";
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
            this.data.server.next.render(req, res, '/Authentication/LoginPage', {}
                // { project_name: this.data.project_name, error: this.reasons[req.query.error] == null ? "" : this.reasons[req.query.error] }
            );
        });

        this.router.post("/", async (req: any, res: any) => {
            const credentials = req.body;
            const validatedUser = await this.validateCredentialsToUser(credentials);
            const entity = await Entity.schema().findOne({ id: validatedUser?.entity });

            if (validatedUser)
                this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);
            else {

                console.log("ERROR")
                return res.status(200).redirect(`/login?error=${entity ? 2 : 1}`);
            }

            return res.redirect(MyCompany.base_url)

            if (this.hasCustomerAndSupplierPermissions(validatedUser, entity))
                return res.status(200).redirect("/");

            return res.status(200).redirect(this.hasCustomerPermissions(validatedUser, entity) ? (Home.base_url + `/#departments`) : MyCompany.base_url);
        });
    }

    public hasCustomerAndSupplierPermissions(user: User, entity: Entity): boolean {
        return this.hasCustomerPermissions(user, entity) && this.hasSupplierPermissions(user, entity);
    }

    public hasCustomerPermissions(user: User, entity: Entity): boolean {
        const list = entity.roles.find(role => role.id == user.role)?.permissions;
        return user.role != null && list != null && list.includes(Permission.CUSTOMER_ALL);
    }

    public hasSupplierPermissions(user: User, entity: Entity): boolean {
        const list = entity.roles.find(role => role.id == user.role)?.permissions;
        return user.role != null && list != null && list.includes(Permission.SUPPLIER_ALL);
    }

    public static async validateCredentials(credentials: { username: string, password: string }): Promise<boolean> {
        return (await User.schema().findOne({ 'credentials.username': credentials.username.toLowerCase() }))?.credentials?.password == credentials.password;
    }

    private async validateCredentialsToUser(credentials: { username: string, password: string }): Promise<User> {
        return await User.schema().findOne({ 'credentials.username': credentials.username.toLowerCase(), 'credentials.password': credentials.password })
    }

}