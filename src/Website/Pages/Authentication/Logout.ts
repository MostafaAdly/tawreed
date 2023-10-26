import User from "../../../Instances/User";
import Page from "../Page";
import Login from "./Login";

export default class Logout extends Page {
    private data: any;
    public static base_url: string = "/logout";
    constructor(data: any, base_url?: string) {
        super(base_url || Logout.base_url);
        this.data = data;
        this.run();
    }

    public run() {
        this.router.get("/", (req, res) => {
            this.data.server.sessionHandler.removeSessionIfExists(req);
            res.redirect(Login.base_url);
        });
    }
}