import User from "../../../Instances/User";
import Page from "../Page";

export default class Login extends Page {
    private data: any;
    public static base_url: string = "/login";
    constructor(data: any, base_url?: string) {
        super(base_url || Login.base_url);
        this.data = data;
        this.run();
    }

    public run() {
        this.router.get("/", (req, res) => {
            res.render('Authentication/login', { project_name: this.data.project_name });
        });
        this.router.post("/", async (req, res) => {
            const credentials = req.body;
            const validatedUser = await this.validateCredentialsToUser(credentials);
            var reason = "Email address or password is incorrect."
            if (validatedUser)
                this.data.server.sessionHandler.validateSessionWithUser(req, validatedUser);
            res.redirect(validatedUser ? `/home` : `/login?error=${reason}`)
        });
    }

    public static async validateCredentials(credentials: { email: string, password: string }): Promise<boolean> {
        const user = await User.schema().findOne({ 'credentials.email': credentials.email.toLowerCase() })
        return user?.credentials?.password == credentials.password;
    }

    private async validateCredentialsToUser(credentials: { email: string, password: string }): Promise<User> {
        return await User.schema().findOne({ 'credentials.email': credentials.email.toLowerCase(), 'credentials.password': credentials.password })
    }

}