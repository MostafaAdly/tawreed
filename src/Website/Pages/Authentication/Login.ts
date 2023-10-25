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
            res.render('Login/index', { project_name: this.data.project_name });
        });
        this.router.post("/", (req, res) => {
            console.log(req.body)
            res.send({})
        });
    }
}