import Page from "../Page";

export default class Home extends Page {
    private data: any;
    public static base_url: string = "/home";
    constructor(data: any, base_url?: string) {
        super(base_url || Home.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        this.router.get(['/', '/home'], (req, res) => {
            // res.render('Home/departments', { project_name: this.data.project_name });
            res.status(200).redirect('/departments');
        });
    }
}