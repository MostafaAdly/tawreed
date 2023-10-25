import Page from "../Page";

export default class Login extends Page {
    private data: any;
    constructor(data: any, base_url: string) {
        super(base_url);
        this.data = data;
        this.run();
    }

    public run() {
        this.router.get("/", (req, res) => {
            res.render('Login/index', { username: "test" });
        })
    }
}