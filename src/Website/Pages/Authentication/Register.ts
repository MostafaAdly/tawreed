import User from "../../../Instances/User";
import Page from "../Page";
import Login from "./Login";

export default class Register extends Page {
    private data: any;
    public static base_url: string = "/register";
    constructor(data: any, base_url?: string) {
        super(base_url || Register.base_url);
        this.data = data;
        this.run();
    }

    public run() {
        this.router.get("/", (req, res) => {
            res.render('Authentication/register', { project_name: this.data.project_name });
        });
        this.router.post("/", async (req, res) => {
            var { name, email, password } = req.body;
            var failed = !name || !email || !password;
            var reason = "Email address or password is not valid.";
            if (!failed) {
                email = email.toLowerCase();
                if (!(await Login.validateCredentials({ email, password }))) {
                    const promisedCreatedUser = await this.createUser(name, email, password);
                    if (promisedCreatedUser) {
                        failed = false;
                        this.data.utils.print(`Created new user with name of ${name["yellow"]} and email of ${email["green"]}`)
                        this.data.server.sessionHandler.validateSessionWithUser(req, promisedCreatedUser);
                    }
                }
            }
            res.redirect(failed ? `/register?error=${reason}` : `/home`)
        });
    }

    private async createUser(name: string, email: string, password: string): Promise<User> {
        return await new User({
            name, credentials: { email: email.toLowerCase(), password }
        }).save()
    }
}