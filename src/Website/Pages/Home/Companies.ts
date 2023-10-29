import Page from "../Page";

export default class Companies extends Page {
    private data: any;
    public static base_url: string = "/companies";
    constructor(data: any, base_url?: string) {
        super(base_url || Companies.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        this.router.get('/', async (req: any, res) => {
            const user = req.session.user;
            res.render('Home/companies', { project_name: this.data.project_name, user });
        });
    }
}