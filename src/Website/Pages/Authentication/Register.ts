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
        this.router.post("/", this.data.server.multer.single("profilePicture"), async (req, res) => {
            var auth = req.body;
            var failed = false;
            var reason = "Email address or password is not valid.";
            if (!failed) {
                auth.email = auth.email.toLowerCase();
                auth.imageURL = req.file?.path;
                if (!(await Login.validateCredentials({ email: auth.email, password: auth.password }))) {
                    const promisedCreatedUser = await this.createUser(auth);
                    await this.handleUserImage(auth.imageURL)
                    if (promisedCreatedUser) {
                        failed = false;
                        this.data.utils.print(`Created new user with name of ${auth.englishName} and email of ${auth.email}`)
                        this.data.server.sessionHandler.validateSessionWithUser(req, promisedCreatedUser);
                    }
                }
            }
            res.redirect(failed ? `/register?error=${reason}` : `/home`)
        });
    }

    private async handleUserImage(url: string) {

    }

    private async createUser(auth: any): Promise<User> {
        return await new User(auth).save()
    }
}